import { Body, Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatEntity } from 'src/services/database/entities/chat/chat.service';
import {
  ChatExtended,
  UserExtended,
} from 'src/services/database/entities/entities.interface';
import { UserEntity } from 'src/services/database/entities/user/user.service';
import { Users } from '../user/user.interface';
import { Data, Response } from 'src/app.interface';
import { ChatListItem, ChatMessage } from './chat.interface';
import { MessageEntity } from '../../entities/message/message.service';
import myGateway from 'src/services/gateway/gateway.decorator';
import { GameService } from '../game/game.service';
import { AchievementsService } from 'src/services/achievements/achievements.service';
import { GameQueue } from '../game/game.interface';
import { RefreshService } from 'src/services/refresh/refresh.service';

@Injectable()
@myGateway()
export class ChatService {
  constructor(
    private readonly chatEntity: ChatEntity,
    private readonly userEntity: UserEntity,
    private readonly messageEntity: MessageEntity,
    private readonly gameService: GameService,
    private readonly achievementService: AchievementsService,
    private readonly refreshService: RefreshService,
  ) {}

  @WebSocketServer() server: Server;

  /**
   * @brief Parses a chat to a ChatListItem
   *
   * @param chat ChatExtended
   * @param user UserExtended
   *
   * @returns ChatListItem
   */
  parseChat(chat: ChatExtended, user: UserExtended): ChatListItem {
    try {
      const otherUser = chat.users.filter(
        (tmpUser) => tmpUser.studentId !== user.studentId,
      )[0];
      return {
        avatar: otherUser.avatar,
        studentId: otherUser.studentId,
        username: otherUser.username,
        status: otherUser.status,
        createdAt:
          chat.messages.length === 0
            ? chat.createdAt
            : chat.messages[chat.messages.length - 1].createdAt,
        lastSeenMessages: this.getLastSeenMessages(user, chat),
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the number of messages that the user has not seen in a chat
   *
   * @param user UserExtended
   * @param chat ChatExtended
   *
   * @returns number
   */
  getLastSeenMessages(user: UserExtended, chat: ChatExtended): number {
    try {
      const commonMessages = user.lastSeenMessages.filter(
        (lastSeenMessage) => lastSeenMessage.chatId === chat.id,
      );
      if (commonMessages.length === 0) return chat.messages.length;
      const lastSeenMessage = commonMessages[commonMessages.length - 1];
      return (
        chat.messages.length -
        1 -
        chat.messages.findIndex((message) => message.id === lastSeenMessage.id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Removes the last seen messages from a user in a chat
   *
   * @param user UserExtended
   * @param chat ChatExtended
   *
   * @returns void
   */
  async removeLastSeenMessages(user: UserExtended, chat: ChatExtended) {
    try {
      const commonMessages = user.lastSeenMessages.filter(
        (lastSeenMessage) => lastSeenMessage.chatId === chat.id,
      );
      if (commonMessages.length === 0) return;
      await Promise.all(
        commonMessages.map(async (lastSeenMessage) => {
          await this.userEntity.update({
            where: { id: user.id },
            data: {
              lastSeenMessages: {
                disconnect: {
                  id: lastSeenMessage.id,
                },
              },
            },
          });
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Adds the last chat message to the user's last seen messages
   *
   * @param user UserExtended
   * @param chat ChatExtended
   *
   * @returns void
   */
  async viewLastMessages(user: UserExtended, chat: ChatExtended) {
    try {
      const messages = chat.messages;
      if (messages.length === 0) return;
      const lastMessageId = messages[messages.length - 1].id;
      await this.userEntity.update({
        where: { studentId: user.studentId },
        data: {
          lastSeenMessages: {
            connect: {
              id: lastMessageId,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the chat name from two users
   *
   * @param users Users
   *
   * @returns string
   */
  getChatName(users: Users): string {
    try {
      return Number(users.studentId) > Number(users.friendStudentId)
        ? `${users.friendStudentId}-${users.studentId}`
        : `${users.studentId}-${users.friendStudentId}`;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Checks if a chat exists
   *
   * @param users Users
   *
   * @returns boolean
   */
  async doesChatExist(users: Users): Promise<boolean> {
    try {
      if (!users || !users.friendStudentId || !users.studentId) return false;
      const chatName = this.getChatName(users);
      return (await this.chatEntity.findOne({ name: chatName })) ? true : false;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Deletes old game messages
   *
   * @param chatName string
   * @param studentId string
   *
   * @returns void
   */
  async deleteOldGameMessages(chatName: string, studentId: string) {
    try {
      const messages = (await this.chatEntity.findOne({ name: chatName }))
        ?.messages;
      if (!messages || messages.length === 0) return;
      await Promise.all(
        messages.map(async (message) => {
          if (message.isGame) {
            const sender = await this.userEntity.findOne({
              id: message.senderId,
            });
            if (sender.studentId === studentId)
              await this.messageEntity.delete({ id: message.id });
          }
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Filters the chats of a user and parses them to ChatListItem[]
   *
   * @param user UserExtended
   *
   * @returns ChatListItem[]
   */
  async filterChats(user: UserExtended) {
    try {
      const chats = await Promise.all(
        user.chats.map(async (chat) => {
          return await this.chatEntity
            .findOne({ name: chat.name })
            .then((tmpChat) => {
              const notMe = tmpChat.users.filter(
                (tmpUser) => tmpUser.studentId !== user.studentId,
              )[0];
              if (
                user.blocked.some(
                  (blockedUser) => blockedUser.studentId === notMe.studentId,
                )
              )
                return null;
              return this.parseChat(tmpChat, user);
            });
        }),
      );
      return chats.filter((chat) => chat !== null);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Gets the messages of a chat
   *
   * @param chat ChatExtended
   *
   * @returns ChatMessage[]
   */
  async getMessages(chat: ChatExtended) {
    try {
      if (chat.messages.length === 0) return [];
      return await Promise.all(
        chat.messages.map(async (message) => {
          const sender = await this.userEntity.findOne({
            id: message.senderId,
          });
          return {
            id: message.id,
            from: {
              username: sender.username,
              studentId: sender.studentId,
              avatar: sender.avatar,
              status: sender.status,
            },
            content: message.content,
            createdAt: message.createdAt,
            isGame: message.isGame,
          };
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Creates a chat
   *
   * @param studentId string
   * @param friendStudentId string
   *
   * @returns { chat: ChatExtended, user: UserExtended }
   * @details This is a helper function for createChat
   */
  async createChatHelper(studentId: string, friendStudentId: string) {
    try {
      const chatName = this.getChatName({
        studentId: studentId,
        friendStudentId: friendStudentId,
      });
      const chat = await this.chatEntity.create({
        name: chatName,
        users: {
          connect: [{ studentId: studentId }, { studentId: friendStudentId }],
        },
      });
      const user = await this.userEntity.update({
        where: { studentId: studentId },
        data: {
          chats: {
            connect: {
              name: chatName,
            },
          },
        },
      });
      await this.userEntity.update({
        where: { studentId: friendStudentId },
        data: {
          chats: {
            connect: {
              name: chatName,
            },
          },
        },
      });
      return { chat: chat, user: user };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Creates a chat
   *
   * @listens Socket `chat/create`
   *
   * @param data { users: Users }
   * @param client Socket
   *
   * @emits Socket `chat/create` { data: ChatListItem }
   * @returns void
   */
  @SubscribeMessage('chat/create')
  createChat(@Body() data, @ConnectedSocket() client): void {
    try {
      if (!data.users || !data.users.friendStudentId || !data.users.studentId)
        client.emit('chat/create', { error: 'Invalid data' });
      else {
        const chatName = this.getChatName(data.users);
        this.doesChatExist(data.users).then((exists) => {
          if (exists)
            client.emit('chat/create', { error: 'Chat already exists' });
          else {
            this.createChatHelper(
              data.users.studentId,
              data.users.friendStudentId,
            ).then((obj) => {
              client.emit('chat/create', {
                data: this.parseChat(obj.chat, obj.user),
              });
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Lists all chats of a user
   *
   * @listens Socket `chat/list`
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @emits Socket `chat/list` { data: ChatListItem[] }
   * @returns void
   */
  @SubscribeMessage('chat/list')
  getChats(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.studentId) client.emit('chat/list', { error: 'Invalid data' });
      else {
        this.userEntity.findOne({ studentId: data.studentId }).then((user) => {
          this.filterChats(user).then((chats) => {
            client.emit('chat/list', { data: chats });
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Lists all messages of a chat
   *
   * @listens Socket `chat/messages`
   *
   * @param data { users: Users }
   * @param client Socket
   *
   * @emits Socket `chat/messages` { data: ChatMessage[] }
   * @returns void
   */
  @SubscribeMessage('chat/messages')
  getChatMessages(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.users) client.emit('chat/messages', { error: 'Invalid data' });
      else {
        const chatName = this.getChatName(data.users);
        this.chatEntity.findOne({ name: chatName }).then((chat) => {
          this.getMessages(chat).then((messages) => {
            this.userEntity
              .findOne({ studentId: data.users.studentId })
              .then((user) => {
                this.removeLastSeenMessages(user, chat).then(() => {
                  this.viewLastMessages(user, chat).then(() => {
                    client.emit('chat/messages', {
                      data: messages as ChatMessage[],
                    });
                    this.refreshService.updateConversationBadges(
                      data.users.studentId,
                      'CHAT',
                      chatName,
                    );
                  });
                });
              });
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Deletes a message from a chat
   *
   * @listens Socket `chat/delete/message`
   *
   * @param data { users: Users, createdAt: Date, content: string }
   * @param client Socket
   *
   * @emits Socket `chat/delete/message` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('chat/delete/message')
  deleteChatMessage(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data || !data.users || !data.createdAt || !data.content)
        client.emit('chat/delete/message', { error: 'Invalid data' });
      else {
        const chatName = this.getChatName(data.users);
        this.chatEntity.findOne({ name: chatName }).then((chat) => {
          this.userEntity
            .findOne({
              studentId: data.users.studentId,
            })
            .then((sender) => {
              this.messageEntity
                .findMany({
                  where: {
                    createdAt: data.createdAt,
                    content: data.content,
                    chatId: chat.id,
                    senderId: sender.id,
                  },
                })
                .then((messages) => {
                  if (messages.length > 0 && messages[0].isGame) {
                    this.gameService.removeFromQueue({
                      type: JSON.parse(data.content).type,
                      level: JSON.parse(data.content).level,
                      mode: JSON.parse(data.content).mode,
                      studentId: sender.studentId,
                      on: 'CHAT',
                      message: {
                        id: messages[0].id,
                        from: {
                          username: sender.username,
                          studentId: sender.studentId,
                          avatar: sender.avatar,
                          status: sender.status,
                        },
                        content: data.content,
                        createdAt: messages[0].createdAt,
                        isGame: true,
                      },
                    });
                  }
                  this.messageEntity.delete({
                    id: messages[0].id,
                  });
                  client.emit('chat/delete/message', {
                    success: 'Message deleted',
                  });
                });
            });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Sends a message to a chat
   *
   * @listens Socket `chat/send`
   *
   * @param data { users: Users, content: string, isGame: boolean }
   * @param client Socket
   *
   * @emits Socket `chat/send` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('chat/send')
  sendChatMessage(@Body() data, @ConnectedSocket() client) {
    try {
      const helper = (
        chatName: string,
        user: UserExtended,
        chat: ChatExtended,
      ) => {
        this.chatEntity
          .update({
            where: { name: chatName },
            data: {
              messages: {
                create: {
                  content: data.content,
                  sender: {
                    connect: {
                      studentId: data.users.studentId,
                    },
                  },
                  isGame: data.isGame,
                },
              },
            },
          })
          .then((chat) => {
            this.removeLastSeenMessages(user, chat).then(() => {
              this.viewLastMessages(user, chat).then(() => {
                client.emit('chat/send', { success: 'Message sent' });
              });
            });
          });
      };

      if (
        !data.users ||
        !data.content ||
        !data.users.studentId ||
        !data.users.friendStudentId ||
        data.isGame === undefined
      )
        client.emit('chat/send', { error: 'Invalid data' });
      else {
        const chatName = this.getChatName(data.users);
        this.userEntity
          .findOne({
            studentId: data.users.studentId,
          })
          .then((user) => {
            if (data.isGame) {
              if (
                !data.content ||
                !this.gameService.checkSelection(JSON.parse(data.content))
              ) {
                client.emit('chat/send', { error: 'Invalid game option' });
                return;
              }
              this.deleteOldGameMessages(chatName, data.users.studentId);
              this.achievementService.updateGameInviteAchievements(
                user,
                'CHAT',
              );
              const game: GameQueue = {
                type: JSON.parse(data.content).type,
                level: JSON.parse(data.content).level,
                mode: JSON.parse(data.content).mode,
                studentId: user.studentId,
                on: 'CHAT',
                message: {
                  id: 0,
                  from: {
                    username: user.username,
                    studentId: user.studentId,
                    avatar: user.avatar,
                    status: user.status,
                  },
                  content: data.content,
                  createdAt: new Date(),
                  isGame: true,
                },
              };
              this.gameService.addToQueue(game);
            }
            this.chatEntity.findOne({ name: chatName }).then((chatFound) => {
              if (!chatFound) {
                this.createChatHelper(
                  data.users.studentId,
                  data.users.friendStudentId,
                ).then((obj) => {
                  helper(chatName, user, obj.chat);
                });
              } else {
                helper(chatName, user, chatFound);
              }
            });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Sends the requested chat as a ChatListItem
   *
   * @listens Socket `chat/get`
   *
   * @param data { users: Users }
   * @param client Socket
   *
   * @emits Socket `chat/get` { data: ChatListItem } | { error: string }
   * @returns void
   */
  @SubscribeMessage('chat/get')
  getChat(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.users) client.emit('chat/get', { error: 'Invalid data' });
      else {
        this.chatEntity
          .findOne({ name: this.getChatName(data.users) })
          .then((chat) => {
            this.userEntity
              .findOne({
                studentId: data.users.studentId,
              })
              .then((user) => {
                const parsedChat = this.parseChat(chat, user);
                client.emit('chat/get', { data: parsedChat });
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Checks if a chat exists
   *
   * @listens Socket `chat/exists`
   *
   * @param data { users: Users }
   * @param client Socket
   *
   * @emits Socket `chat/exists` { data: boolean }
   * @returns void
   */
  @SubscribeMessage('chat/exists')
  chatExists(@Body() data, @ConnectedSocket() client) {
    try {
      this.doesChatExist(data.users).then((exists) => {
        client.emit('chat/exists', { data: exists });
      });
    } catch (error) {
      console.error(error);
    }
  }
}

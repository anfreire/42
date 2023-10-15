import { Body, Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entities/user/user.service';
import { ChannelEntity } from '../database/entities/channel/channel.service';
import { ChatEntity } from '../database/entities/chat/chat.service';
import { User, Users } from '../database/transactions/user/user.interface';
import { Channel, Chat, User as PrismaUser } from '@prisma/client';
import {
  RefreshEvents,
  RefreshRequest,
  RefreshResponse,
  RefreshMessages,
  RefreshFriends,
  RefreshConversations,
} from './refresh.interface';
import { ConfigService } from '@nestjs/config';
import { Server } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from '../database/transactions/chat/chat.service';
import { GatewayService } from '../gateway/gateway.service';
import myGateway from '../gateway/gateway.decorator';
import { GameEntity } from '../database/entities/game/game.service';
import {
  GameExtended,
  UserExtended,
} from '../database/entities/entities.interface';
import { GameService } from '../database/transactions/game/game.service';
import {
  GameJoin,
  GameListItem,
} from '../database/transactions/game/game.interface';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
@myGateway()
export class RefreshService {
  private toEmit: RefreshResponse;
  constructor(
    private readonly userEntity: UserEntity,
    private readonly channelEntity: ChannelEntity,
    private readonly chatEntity: ChatEntity,
    private readonly gameEntity: GameEntity,
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('refresh')
  refresh(@Body() data: RefreshRequest) {
    try {
      this.clear(data).then(() => {
        switch (data.event) {
          //-------------------------------------------
          // CONVERSATIONS
          case RefreshEvents.MESSAGE_SENT:
            this.handleMessageSent(data);
            break;
          case RefreshEvents.MESSAGE_DELETED:
            this.handleMessageDeleted(data);
            break;
          //-------------------------------------------
          // CHANNEL
          case RefreshEvents.CHANNEL_CREATED:
            this.handleChannelCreated(data);
            break;
          case RefreshEvents.CHANNEL_REMOVED:
            this.handleChannelRemoved(data);
            break;
          case RefreshEvents.CHANNEL_JOINED:
            this.handleChannelJoined(data);
            break;
          case RefreshEvents.CHANNEL_LEFT:
            this.handleChannelLeft(data);
            break;
          case RefreshEvents.CHANNEL_ADMIN_PROMOTION:
            this.handleChannelAdminPromotion(data);
            break;
          case RefreshEvents.CHANNEL_ADMIN_DEMOTION:
            this.handleChannelAdminDemotion(data);
            break;
          case RefreshEvents.CHANNEL_USER_INVIATION:
            this.handleChannelUserInvitation(data);
            break;
          case RefreshEvents.CHANNEL_USER_BAN:
            this.handleChannelUserBan(data);
            break;
          case RefreshEvents.CHANNEL_USER_UNBAN:
            this.handleChannelUserUnban(data);
            break;
          case RefreshEvents.CHANNEL_UPDATED:
            this.handleChannelUpdated(data);
            break;
          case RefreshEvents.CHANNEL_USER_MUTED:
            this.handleChannelUserMuted(data);
            break;
          case RefreshEvents.CHANNEL_USER_UNMUTED:
            this.handleChannelUserUnmuted(data);
            break;
          case RefreshEvents.CHANNEL_USER_KICKED:
            this.handleChannelUserKicked(data);
            break;
          //-------------------------------------------
          // CHAT
          case RefreshEvents.CHAT_CREATED:
            this.handleChatCreated(data);
            break;
          //-------------------------------------------
          // USER
          case RefreshEvents.AVATAR_CHANGE:
            this.handleAvatarChange(data);
            break;
          case RefreshEvents.STATUS_CHANGE:
            this.handleStateChange(data);
            break;
          //-------------------------------------------
          // SOCIAL
          case RefreshEvents.FRIEND_REQUEST_RESPONSE:
            this.handleFriendRequestResponse(data);
            break;
          case RefreshEvents.FRIEND_REQUEST_SENT:
            this.handleFriendRequestSent(data);
            break;
          case RefreshEvents.FRIEND_REMOVED:
            this.handleFriendRemoved(data);
            break;
          case RefreshEvents.USER_BLOCKED:
            this.handleUserBlocked(data);
            break;
          //-------------------------------------------
          // GAME
          case RefreshEvents.GAME_INVITE_RESPONSE:
            this.handleGameInviteResponse(data);
            break;
          case RefreshEvents.GAME_INVITE_SENT:
            this.handleGameInviteSent(data);
            break;
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async clear(request: RefreshRequest) {
    try {
      this.toEmit = {
        request: request,
        fromUsername: await this.getUsername(request.studentId),
        target: [],
        data: null,
        updateMessages: false,
        updateFriendList: false,
        updateFriendRequestList: false,
        updateProfile: false,
        updateConversations: false,
        updateCurrentConversation: false,
        updateChannelUsers: false,
        updateCurrGame: false,
        updateBlockedUsers: false,
        updateAchievements: false,
      };
      if ((request as any).friendStudentId) {
        this.toEmit.target.push((request as any).friendStudentId);
      }
    } catch (e) {
      console.error(e);
    }
  }

  send() {
    try {
      this.server.emit('refresh', this.toEmit);
    } catch (e) {
      console.error(e);
    }
  }

  parseUser(user: PrismaUser): string {
    try {
      return user.studentId;
    } catch (e) {
      console.error(e);
    }
  }

  parseUsers(users: PrismaUser[]): string[] {
    try {
      return users.map((user) => {
        return this.parseUser(user);
      });
    } catch (e) {
      console.error(e);
    }
  }

  parseChannel(channel: Channel): string {
    try {
      return channel.name;
    } catch (e) {
      console.error(e);
    }
  }

  parseChannels(channels: Channel[]) {
    try {
      return channels.map((channel) => {
        return this.parseChannel(channel);
      });
    } catch (e) {
      console.error(e);
    }
  }

  parseChat(chat: Chat): string {
    try {
      return chat.name;
    } catch (e) {
      console.error(e);
    }
  }

  parseChats(chats: Chat[]) {
    try {
      return chats.map((chat) => {
        return this.parseChat(chat);
      });
    } catch (e) {
      console.error(e);
    }
  }

  sendQueueMatch(game: GameJoin, listItem: GameListItem) {
    try {
      this.clear({
        event: RefreshEvents.GAME_INVITE_RESPONSE,
        studentId: game.studentId,
        friendStudentId: game.whoJoinsStudentId,
        type: 'QUEUE',
        name: '',
      } as RefreshMessages).then(() => {
        this.toEmit.data = listItem;
        this.toEmit.target = [game.whoJoinsStudentId];
        this.toEmit.updateCurrGame = true;
        this.send();
        this.clear({
          event: RefreshEvents.GAME_INVITE_RESPONSE,
          studentId: game.whoJoinsStudentId,
          friendStudentId: game.studentId,
          type: 'QUEUE',
          name: '',
        } as RefreshMessages).then(() => {
          this.toEmit.data = listItem;
          this.toEmit.target = [game.studentId];
          this.toEmit.updateCurrGame = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getUsername(studentId: string) {
    try {
      return (await this.userEntity.findOne({ studentId: studentId })).username;
    } catch (e) {
      console.error(e);
    }
  }

  async getFriends(studentId: string): Promise<string[]> {
    try {
      const user = await this.userEntity.findOne({ studentId: studentId });
      return this.parseUsers(user.friends);
    } catch (e) {
      console.error(e);
    }
  }

  async getChannelUsers(channelName: string): Promise<string[]> {
    try {
      const channel = await this.channelEntity.findOne({ name: channelName });
      let users: string[] = [
        ...this.parseUsers(channel.users),
        ...this.parseUsers(channel.admins),
        this.parseUser(channel.owner),
      ];
      return users;
    } catch (e) {
      console.error(e);
    }
  }

  getChatUsers(chatName: string): string[] {
    try {
      return chatName.split('-');
    } catch (e) {
      console.error(e);
    }
  }

  handleGameInviteSent(req: RefreshRequest) {
    try {
      req = req as RefreshMessages;
      this.toEmit.updateMessages = true;
      this.toEmit.updateConversations = true;
      this.toEmit.updateCurrentConversation = true;
      if (req.type === 'CHAT') {
        const chat = req.name;
        this.toEmit.target.push(...this.getChatUsers(chat));
        this.send();
      } else if (req.type === 'CHANNEL') {
        const channel = req.name;
        this.getChannelUsers(channel).then((users) => {
          this.toEmit.target.push(...users);
          this.send();
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  handleGameInviteResponse(req: RefreshRequest) {
    try {
      const parseUser = (user: any): User => {
        return {
          studentId: user.studentId,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
        };
      };
      this.handleGameInviteSent(req);
      this.clear(req).then(() => {
        this.gameEntity
          .findMany({
            where: {
              players: {
                some: {
                  studentId: req.studentId,
                },
              },
              state: 'PLAYING',
            },
          })
          .then((games) => {
            if (games.length === 0) return;
            req = req as RefreshFriends;
            const highestGameId = games.reduce((prev, curr) => {
              return prev.id > curr.id ? prev : curr;
            });
            const game = {
              id: highestGameId.id,
              players: highestGameId.players.map((player) => {
                return parseUser(player);
              }),
              mode: highestGameId.mode,
              ...(highestGameId.winner
                ? { winner: parseUser(highestGameId.winner) }
                : {}),
              ...(highestGameId.loser
                ? { looser: parseUser(highestGameId.loser) }
                : {}),
            };
            this.toEmit.data = game;
            this.toEmit.target.push(req.friendStudentId, req.studentId);
            this.toEmit.updateCurrGame;
            this.send();
          });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async isBlocked(studentId: string, friendStudentId: string) {
    try {
      const user = await this.userEntity.findOne({ studentId: studentId });
      if (user.blocked.find((user) => user.studentId === friendStudentId)) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  }

  async getNotBlockedChannelUsers(channelName: string, studentId: string) {
    try {
      const users = (await this.getChannelUsers(channelName)).filter(
        (user) => user !== studentId,
      );
      let notBlockedUsers: string[] = [];
      for (const user of users) {
        if (!(await this.isBlocked(user, studentId))) {
          notBlockedUsers.push(user);
        }
      }
      notBlockedUsers.push(studentId);
      return notBlockedUsers;
    } catch (e) {
      console.error(e);
    }
  }

  handleMessageSent(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshMessages;
        this.toEmit.updateMessages = true;
        this.toEmit.updateConversations = true;
        if (req.type === 'CHAT') {
          this.chatEntity.findOne({ name: req.name }).then((chat) => {
            const users = this.getChatUsers(chat.name);
            const notMe = users.filter((user) => user !== req.studentId);
            this.isBlocked(notMe[0], req.studentId).then((isBlocked) => {
              if (!isBlocked) {
                this.toEmit.target.push(...this.getChatUsers(chat.name));
              } else this.toEmit.target.push(req.studentId);
              this.send();
            });
          });
        } else if (req.type === 'CHANNEL') {
          this.channelEntity
            .findOne({
              name: req.name,
            })
            .then((channel) => {
              this.getNotBlockedChannelUsers(channel.name, req.studentId).then(
                (users) => {
                  this.toEmit.target.push(...users);
                  this.send();
                },
              );
            });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleMessageDeleted(req: RefreshRequest) {
    try {
      this.handleChannelRemoved(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleAvatarChange(req: RefreshRequest) {
    try {
      this.userEntity.getAll().then((allUsers) => {
        this.toEmit.target.push(...this.parseUsers(allUsers));
        this.toEmit.updateMessages = true;
        this.toEmit.updateFriendList = true;
        this.toEmit.updateFriendRequestList = true;
        this.toEmit.updateProfile = true;
        this.toEmit.updateConversations = true;
        this.toEmit.updateCurrentConversation = true;
        this.toEmit.updateChannelUsers = true;
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleFriendRequestResponse(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshFriends;
        this.toEmit.target = [req.studentId, req.friendStudentId];
        this.toEmit.updateFriendList = true;
        this.toEmit.updateFriendRequestList = true;
        this.toEmit.updateProfile = true;
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleFriendRemoved(req: RefreshRequest) {
    try {
      this.handleFriendRequestResponse(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleFriendRequestSent(req: RefreshRequest) {
    try {
      this.handleFriendRequestResponse(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleStateChange(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        this.userEntity.getAll().then((allUsers) => {
          this.toEmit.target.push(...this.parseUsers(allUsers));
          this.toEmit.updateFriendList = true;
          this.toEmit.updateFriendRequestList = true;
          this.toEmit.updateProfile = true;
          this.toEmit.updateConversations = true;
          this.toEmit.updateCurrentConversation = true;
          this.toEmit.updateChannelUsers = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelCreated(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshConversations;
        this.getChannelUsers(req.name).then((users) => {
          this.toEmit.target.push(...users);
          this.toEmit.updateConversations = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChatCreated(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshConversations;
        this.toEmit.target.push(...this.getChatUsers(req.name));
        this.toEmit.updateConversations = true;
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelRemoved(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        this.userEntity.getAll().then((allUsers) => {
          this.toEmit.target.push(...this.parseUsers(allUsers));
          this.toEmit.updateConversations = true;
          this.toEmit.updateChannelUsers = true;
          this.toEmit.updateCurrentConversation = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelJoined(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshConversations;
        this.getChannelUsers(req.name).then((users) => {
          this.toEmit.target.push(...users);
          this.toEmit.updateConversations = true;
          this.toEmit.updateChannelUsers = true;
          this.toEmit.updateCurrentConversation = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUpdated(req: RefreshRequest) {
    try {
      this.clear(req).then(() => {
        req = req as RefreshConversations;
        this.getChannelUsers(req.name).then((users) => {
          this.toEmit.target.push(...users);
          this.toEmit.updateConversations = true;
          this.toEmit.updateCurrentConversation = true;
          this.toEmit.updateChannelUsers = true;
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelLeft(req: RefreshRequest) {
    try {
      this.handleChannelRemoved(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelAdminPromotion(req: RefreshRequest) {
    try {
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelAdminDemotion(req: RefreshRequest) {
    try {
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserInvitation(req: RefreshRequest) {
    try {
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserBan(req: RefreshRequest) {
    try {
      this.toEmit.target.push((req as RefreshConversations).friendStudentId);
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserUnban(req: RefreshRequest) {
    try {
      this.toEmit.target.push((req as RefreshConversations).friendStudentId);
      this.handleChannelUserBan(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserMuted(req: RefreshRequest) {
    try {
      this.toEmit.updateMessages = true;
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserUnmuted(req: RefreshRequest) {
    try {
      this.toEmit.updateMessages = true;
      this.handleChannelJoined(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleChannelUserKicked(req: RefreshRequest) {
    try {
      this.handleChannelUserBan(req);
    } catch (e) {
      console.error(e);
    }
  }

  handleUserBlocked(req: RefreshRequest) {
    try {
      req = req as RefreshFriends;
      this.clear(req).then(() => {
        this.toEmit.target.push(req.studentId);
        this.toEmit.updateFriendList = true;
        this.toEmit.updateConversations = true;
        this.toEmit.updateMessages = true;
        this.toEmit.updateCurrentConversation = true;
        this.toEmit.updateProfile = true;
        this.toEmit.updateFriendList = true;
        this.toEmit.updateBlockedUsers = true;
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }

  updateConversationBadges(
    studentId: string,
    type: 'CHAT' | 'CHANNEL',
    name: string,
  ) {
    try {
      this.clear({
        event: RefreshEvents.CHANNEL_UPDATED,
        name,
        studentId: studentId,
        type: type,
      } as RefreshConversations).then(() => {
        this.toEmit.updateConversations = true;
        this.toEmit.target.push(studentId);
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }

  updateChannel(channelName: string, studentId: string) {
    try {
      this.clear({
        event: RefreshEvents.CHANNEL_UPDATED,
        name: channelName,
        studentId: studentId,
        type: 'CHANNEL',
      } as RefreshConversations).then(() => {
        this.toEmit.updateConversations = true;
        this.toEmit.updateMessages = true;
        this.toEmit.updateCurrentConversation = true;
        this.toEmit.updateChannelUsers = true;
        this.getChannelUsers(channelName).then((users) => {
          this.toEmit.target.push(...users);
          this.send();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  updateAchievements(studentId: string) {
    try {
      this.clear({
        event: RefreshEvents.UPDATE_ACHIEVEMENTS,
        studentId: studentId,
      }).then(() => {
        this.toEmit.updateAchievements = true;
        this.toEmit.target.push(studentId);
        this.send();
      });
    } catch (e) {
      console.error(e);
    }
  }
}

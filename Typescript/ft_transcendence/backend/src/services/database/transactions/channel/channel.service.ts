import { Body, Injectable } from '@nestjs/common';
import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Data } from 'src/app.interface';
import { ChannelEntity } from 'src/services/database/entities/channel/channel.service';
import { UserEntity } from 'src/services/database/entities/user/user.service';
import {
  ChannelExtended,
  UserExtended,
} from '../../entities/entities.interface';
import { Socket } from 'socket.io';
import { Channel } from '@prisma/client';
import { MessageEntity } from '../../entities/message/message.service';
import { RefreshService } from 'src/services/refresh/refresh.service';
import { RefreshEvents } from 'src/services/refresh/refresh.interface';
import myGateway from 'src/services/gateway/gateway.decorator';
import { GameService } from '../game/game.service';
import { AchievementsService } from 'src/services/achievements/achievements.service';
import { ChannelListItem } from './channel.interface';
import { User } from '../user/user.interface';
import { GameQueue } from '../game/game.interface';
const bcrypt = require('bcrypt');

@Injectable()
@myGateway()
export class ChannelService {
  private muted: {
    channelName: string;
    studentId: string;
    timeout: NodeJS.Timeout;
  }[] = [];

  constructor(
    private readonly channelEntity: ChannelEntity,
    private readonly userEntity: UserEntity,
    private readonly messageEntity: MessageEntity,
    private readonly refreshService: RefreshService,
    private readonly gameService: GameService,
    private readonly achievementService: AchievementsService,
  ) {}

  /**
   * @async
   *
   * @brief Hashes a password
   *
   * @param password string
   *
   * @returns Promise<string>
   */
  async hashPassword(password: string) {
    if (!password || password.length === 0) return;
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Compares a password with a hash
   *
   * @param password string
   * @param hash string
   *
   * @returns Promise<boolean>
   */
  async comparePassword(password: string, hash: string) {
    try {
      if (!password || !hash || password.length === 0 || hash.length === 0)
        return false;
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Parses a channel to a ChannelListItem
   *
   * @param channel Channel
   * @param user UserExtended
   *
   * @returns Promise<ChannelListItem>
   */
  async parseChannel(
    channel: Channel,
    user: UserExtended,
  ): Promise<ChannelListItem> {
    try {
      const tmpChannel = await this.channelEntity.findOne({
        name: channel.name,
      });
      let users = [];
      users.push(...tmpChannel.users, ...tmpChannel.admins, tmpChannel.owner);
      const online = users.filter((user) => user.status === 'ONLINE');
      return {
        id: channel.id,
        name: channel.name,
        avatar: channel.avatar,
        online: online.length,
        createdAt:
          tmpChannel.messages.length === 0
            ? tmpChannel.createdAt
            : tmpChannel.messages[tmpChannel.messages.length - 1].createdAt,
        lastSeenMessages: this.getLastSeenMessages(tmpChannel, user).data,
        type: channel.type,
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Deletes the old game messages of a user in a channel
   *
   * @param channelName string
   * @param studentId string
   *
   * @returns Promise<void>
   */
  async deleteOldGameMessages(channelName: string, studentId: string) {
    try {
      const messages = (
        await this.channelEntity.findOne({
          name: channelName,
        })
      ).messages;
      if (messages.length === 0) return;
      await Promise.all(
        messages.map(async (message) => {
          if (message.isGame) {
            const sender = await this.userEntity.findOne({
              id: message.senderId,
            });
            if (sender.studentId === studentId)
              await this.messageEntity.delete({
                id: message.id,
              });
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
   * @brief Removes the owner of a channel, replacing him with the first admin or user
   *
   * @param user UserExtended
   * @param channel ChannelExtended
   *
   * @returns Promise<boolean>
   *
   * @details If the user passed as a param is the owner of the channel returns true, otherwise returns false
   */
  async ownerLeaves(user: UserExtended, channel: ChannelExtended) {
    try {
      if (channel.owner.studentId === user.studentId) {
        if (channel.admins.length === 0 && channel.users.length === 0) {
          await this.channelEntity.delete({
            name: channel.name,
          });
          await this.refreshService.refresh({
            studentId: user.studentId,
            type: 'CHANNEL',
            event: RefreshEvents.CHANNEL_REMOVED,
            name: channel.name,
          });
        } else {
          if (channel.admins.length > 0) {
            const newOwner = channel.admins[0];
            await this.channelEntity.update({
              where: { name: channel.name },
              data: {
                owner: {
                  connect: {
                    studentId: newOwner.studentId,
                  },
                },
                admins: {
                  disconnect: {
                    studentId: newOwner.studentId,
                  },
                },
              },
            });
            await this.userEntity.update({
              where: { studentId: newOwner.studentId },
              data: {
                ownerOf: {
                  connect: {
                    name: channel.name,
                  },
                },
                adminOf: {
                  disconnect: {
                    name: channel.name,
                  },
                },
              },
            });
          } else {
            const newOwner = channel.users[0];
            await this.channelEntity.update({
              where: { name: channel.name },
              data: {
                owner: {
                  connect: {
                    studentId: newOwner.studentId,
                  },
                },
                users: {
                  disconnect: {
                    studentId: newOwner.studentId,
                  },
                },
              },
            });
            await this.userEntity.update({
              where: { studentId: newOwner.studentId },
              data: {
                ownerOf: {
                  connect: {
                    name: channel.name,
                  },
                },
                channels: {
                  disconnect: {
                    name: channel.name,
                  },
                },
              },
            });
          }
          await this.refreshService.refresh({
            studentId: user.studentId,
            type: 'CHANNEL',
            event: RefreshEvents.CHANNEL_LEFT,
            name: channel.name,
          });
        }
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Removes an admin of a channel
   *
   * @param user UserExtended
   * @param channel ChannelExtended
   *
   * @returns Promise<boolean>
   *
   * @details If the user passed as a param is an admin of the channel returns true, otherwise returns false
   */
  async adminLeaves(user: UserExtended, channel: ChannelExtended) {
    try {
      if (channel.admins.find((admin) => admin.studentId === user.studentId)) {
        await this.userEntity.update({
          where: { studentId: user.studentId },
          data: {
            adminOf: {
              disconnect: {
                name: channel.name,
              },
            },
          },
        });
        await this.channelEntity.update({
          where: { name: channel.name },
          data: {
            admins: {
              disconnect: {
                studentId: user.studentId,
              },
            },
          },
        });
        this.refreshService.refresh({
          studentId: user.studentId,
          type: 'CHANNEL',
          event: RefreshEvents.CHANNEL_LEFT,
          name: channel.name,
        });
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Removes a user of a channel
   *
   * @param user UserExtended
   * @param channel ChannelExtended
   *
   * @returns Promise<boolean>
   *
   * @details If the user passed as a param is a user of the channel returns true, otherwise returns false
   */
  async userLeaves(user: UserExtended, channel: ChannelExtended) {
    try {
      if (channel.users.find((_user) => _user.studentId === user.studentId)) {
        await this.userEntity.update({
          where: { studentId: user.studentId },
          data: {
            channels: {
              disconnect: {
                name: channel.name,
              },
            },
          },
        });
        await this.channelEntity.update({
          where: { name: channel.name },
          data: {
            users: {
              disconnect: {
                studentId: user.studentId,
              },
            },
          },
        });
        this.refreshService.refresh({
          studentId: user.studentId,
          type: 'CHANNEL',
          event: RefreshEvents.CHANNEL_LEFT,
          name: channel.name,
        });
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the number of messages that the user has not seen in a channel
   *
   * @param channel ChannelExtended
   * @param user UserExtended
   *
   * @returns Data<number>
   */
  getLastSeenMessages(
    channel: ChannelExtended,
    user: UserExtended,
  ): Data<number> {
    try {
      const commonMessages = user.lastSeenMessages.filter(
        (lastSeenMessage) => lastSeenMessage.channelId === channel.id,
      );
      if (commonMessages.length === 0) return { data: channel.messages.length };
      const lastSeenMessage = commonMessages[0];
      return {
        data:
          channel.messages.length -
          1 -
          channel.messages.findIndex(
            (message) => message.id === lastSeenMessage.id,
          ),
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Removes the last seen messages of a user in a channel
   *
   * @param channel ChannelExtended
   * @param user UserExtended
   *
   * @returns Promise<void>
   */
  async removeLastSeenMessages(channel: ChannelExtended, user: UserExtended) {
    try {
      const commonMessages = user.lastSeenMessages.filter(
        (lastSeenMessage) => lastSeenMessage.channelId === channel.id,
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
   * @brief Adds the last messages of a channel to the user's last seen messages
   *
   * @param channel ChannelExtended
   * @param user UserExtended
   *
   * @returns Promise<void>
   */
  async viewLastMessages(channel: ChannelExtended, user: UserExtended) {
    try {
      const messages = channel.messages;
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
   * @async
   *
   * @brief Checks if a channel exists
   *
   * @param channelName string
   *
   * @returns Promise<Data<boolean>>
   */
  async doesChannelExist(channelName: string): Promise<Data<boolean>> {
    try {
      return (await this.channelEntity.findOne({
        name: channelName,
      }))
        ? { data: true }
        : { data: false };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Gets the messages of a channel
   *
   * @param channel ChannelExtended
   * @param user UserExtended
   *
   * @returns Promise<Message[]>
   */
  async getChannelMessages(channel: ChannelExtended, user: UserExtended) {
    try {
      const messages = await Promise.all(
        channel.messages.map(async (message) => {
          const sender = await this.userEntity.findOne({
            id: message.senderId,
          });
          if (
            user.studentId !== sender.studentId &&
            (channel.muted.find(
              (user) => user.studentId === sender.studentId,
            ) ||
              user.blocked.find((user) => user.studentId === sender.studentId))
          )
            return null;
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
      return messages.filter((message) => message);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @brief Parses multiple channels to ChannelListItems
   *
   * @param channels Channel[]
   * @param user UserExtended
   *
   * @returns Promise<ChannelListItem[]>
   */
  async parseMultipleChannels(channels: Channel[], user: UserExtended) {
    try {
      return await Promise.all(
        channels.map(async (channel) => {
          return await this.parseChannel(channel, user);
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Creates a new channel
   *
   * @listens Socket `channel/create`
   *
   * @param data { name: string, owner: string, users: string[], avatar: string, type: string, password?: string }
   * @param client Socket
   *
   * @emits Socket `channel/create` { data: ChannelListItem } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/create')
  createChannel(@Body() data, @ConnectedSocket() client) {
    try {
      if (
        !data.name ||
        !data.owner ||
        !data.users ||
        !data.avatar ||
        !data.type
      )
        client.emit('channel/create', { error: 'Invalid data' });
      else if (data.avatar === '')
        client.emit('channel/create', { error: 'Invalid avatar' });
      else if (data.name.length < 3)
        client.emit('channel/create', {
          error: 'Channel name must be at least 3 characters long',
        });
      else if (data.name.length > 20)
        client.emit('channel/create', {
          error: 'Channel name must be at most 20 characters long',
        });
      else if (
        data.type === 'PROTECTED' &&
        (!data.password || data.password.length === '')
      )
        client.emit('channel/create', { error: 'You must have a password' });
      else {
        this.doesChannelExist(data.name).then((res) => {
          if (res.data) {
            client.emit('channel/create', { error: 'Channel already exists' });
          } else {
            this.hashPassword(data.password).then((hash) => {
              this.channelEntity
                .create({
                  name: data.name,
                  avatar: data.avatar,
                  type: data.type,
                  ...(data.password && {
                    password: hash,
                  }),
                  owner: {
                    connect: {
                      studentId: data.owner,
                    },
                  },
                  users: {
                    connect: data.users.map((user) => ({
                      studentId: user,
                    })),
                  },
                })
                .then((channel) => {
                  this.userEntity
                    .findOne({
                      studentId: data.owner,
                    })
                    .then((user) => this.parseChannel(channel, user))
                    .then((parsedChannel) => {
                      client.emit('channel/create', { data: parsedChannel });
                    });
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
   * @brief Gets the channels available to join
   *
   * @listens Socket `channel/available`
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/available` { data: ChannelListItem[] } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/available')
  getAvailableChannels(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.studentId)
        client.emit('channel/available', { error: 'Invalid data' });
      else {
        this.userEntity.findOne({ studentId: data.studentId }).then((user) => {
          if (!user)
            client.emit('channel/available', { error: 'User does not exist' });
          else {
            this.channelEntity.getAll().then((channels) => {
              const channelsThatUserIsNotIn = channels.filter(
                (channel) =>
                  !channel.users.find(
                    (user) => user.studentId === data.studentId,
                  ) &&
                  !channel.admins.find(
                    (user) => user.studentId === data.studentId,
                  ) &&
                  channel.owner.studentId !== data.studentId,
              );
              const channelsThatAreNotPrivate = channelsThatUserIsNotIn.filter(
                (channel) => channel.type !== 'PRIVATE',
              );
              this.parseMultipleChannels(channelsThatAreNotPrivate, user).then(
                (parsedChannels) => {
                  client.emit('channel/available', { data: parsedChannels });
                },
              );
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserChannels(user: UserExtended) {
    try {
      let channels: ChannelListItem[] = [];
      channels.push(
        ...(await Promise.all(
          user.channels.map(async (userOf) => {
            return await this.parseChannel(userOf, user);
          }),
        )),
      );
      channels.push(
        ...(await Promise.all(
          user.ownerOf.map(async (ownerOf) => {
            return await this.parseChannel(ownerOf, user);
          }),
        )),
      );
      channels.push(
        ...(await Promise.all(
          user.adminOf.map(async (adminOf) => {
            return await this.parseChannel(adminOf, user);
          }),
        )),
      );
      return channels;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the channels that the user is in (owner, admin, user)
   *
   * @listens Socket `channel/list`
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/list` { data: ChannelListItem[] } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/list')
  getChannels(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.studentId)
        client.emit('channel/list', { error: 'Invalid data' });
      else {
        this.userEntity.findOne({ studentId: data.studentId }).then((user) => {
          this.getUserChannels(user).then((channels) => {
            client.emit('channel/list', { data: channels });
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the users that are in a channel
   *
   * @listens Socket `channel/users`
   *
   * @param data { channelName: string }
   * @param client Socket
   *
   * @emits Socket `channel/users` { data: ChannelUsers } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/users')
  getUsers(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName)
        client.emit('channel/users', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({
            name: data.channelName,
          })
          .then((channel) => {
            if (!channel) {
              return;
            }
            const rawOwner = channel.owner;
            const rawUsers = channel.users.filter(
              (user) =>
                !channel.banned.find(
                  (banned) => banned.studentId === user.studentId,
                ) &&
                !channel.muted.find(
                  (muted) => muted.studentId === user.studentId,
                ),
            );
            const rawAdmins = channel.admins.filter(
              (user) =>
                !channel.banned.find(
                  (banned) => banned.studentId === user.studentId,
                ) &&
                !channel.muted.find(
                  (muted) => muted.studentId === user.studentId,
                ),
            );
            const rawBanned = channel.banned;
            const rawMuted = channel.muted;
            const owner = {
              username: rawOwner.username,
              studentId: rawOwner.studentId,
              avatar: rawOwner.avatar,
              status: rawOwner.status,
            };
            const users = rawUsers.map((user) => ({
              username: user.username,
              studentId: user.studentId,
              avatar: user.avatar,
              status: user.status,
            }));
            const admins = rawAdmins.map((user) => ({
              username: user.username,
              studentId: user.studentId,
              avatar: user.avatar,
              status: user.status,
            }));
            const banned = rawBanned.map((user) => ({
              username: user.username,
              studentId: user.studentId,
              avatar: user.avatar,
              status: user.status,
            }));
            const muted = rawMuted.map((user) => ({
              username: user.username,
              studentId: user.studentId,
              avatar: user.avatar,
              status: user.status,
            }));
            client.emit('channel/users', {
              data: { owner, users, admins, banned, muted },
            });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the messages of a channel
   *
   * @listens Socket `channel/messages`
   *
   * @param data { channelName: string, studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/messages` { data: Message[] } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/messages')
  getMessages(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId)
        client.emit('channel/messages', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({ name: data.channelName })
          .then((channel) => {
            if (!channel) return;
            this.userEntity
              .findOne({ studentId: data.studentId })
              .then((user) => {
                this.removeLastSeenMessages(channel, user).then(() => {
                  this.viewLastMessages(channel, user).then(() => {
                    this.getChannelMessages(channel, user).then((messages) => {
                      client.emit('channel/messages', { data: messages });
                      this.refreshService.updateConversationBadges(
                        user.studentId,
                        'CHANNEL',
                        channel.name,
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
   * @brief Sends a message to a channel
   *
   * @listens Socket `channel/send`
   *
   * @param data { channelName: string, from: string, content: string, isGame: boolean }
   * @param client Socket
   *
   * @emits Socket `channel/send` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/send')
  sendMessage(@Body() data, @ConnectedSocket() client) {
    try {
      if (
        !data.channelName ||
        !data.from ||
        !data.content ||
        data.isGame === undefined
      )
        client.emit('channel/send', { error: 'Invalid data' });
      else {
        this.userEntity.findOne({ studentId: data.from }).then((user) => {
          if (data.isGame) {
            if (
              !data.content ||
              !this.gameService.checkSelection(JSON.parse(data.content))
            ) {
              client.emit('channel/send', { error: 'Invalid game option' });
              return;
            } else {
              this.deleteOldGameMessages(data.channelName, data.from);
              this.achievementService.updateGameInviteAchievements(
                user,
                'CHANNEL',
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
          }
          this.channelEntity
            .update({
              where: { name: data.channelName },
              data: {
                messages: {
                  create: {
                    content: data.content,
                    sender: {
                      connect: {
                        studentId: data.from,
                      },
                    },
                    isGame: data.isGame,
                  },
                },
              },
            })
            .then((channel) => {
              if (!channel) return;
              this.viewLastMessages(channel, user).then(() => {
                this.removeLastSeenMessages(channel, user).then(() => {
                  client.emit('channel/send', { success: 'Message sent' });
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
   * @brief Deletes a channel
   *
   * @listens Socket `channel/delete`
   *
   * @param data { channelName: string, studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/delete` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/delete')
  deleteChannel(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId)
        client.emit('channel/delete', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({
            name: data.channelName,
          })
          .then((channel) => {
            if (!channel)
              client.emit('channel/delete', {
                error: 'Channel does not exist',
              });
            else if (channel.owner.studentId !== data.studentId)
              client.emit('channel/delete', {
                error: 'You are not the owner of this channel',
              });
            else {
              this.channelEntity
                .delete({
                  name: data.channelName,
                })
                .then(() => {
                  client.emit('channel/delete', { success: 'Channel deleted' });
                });
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Deletes a message from a channel
   *
   * @listens Socket `channel/delete/message`
   *
   * @param data { channelName: string, studentId: string, createdAt: Date, content: string }
   * @param client Socket
   *
   * @emits Socket `channel/delete/message` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/delete/message')
  deleteMessage(@Body() data, @ConnectedSocket() client) {
    try {
      if (
        !data.channelName ||
        !data.studentId ||
        !data.createdAt ||
        !data.content
      )
        client.emit('channel/delete/message', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({
            name: data.channelName,
          })
          .then((channel) => {
            if (!channel) return;
            this.userEntity
              .findOne({
                studentId: data.studentId,
              })
              .then((sender) => {
                this.messageEntity
                  .findMany({
                    where: {
                      createdAt: data.createdAt,
                      content: data.content,
                      senderId: sender.id,
                      channelId: channel.id,
                    },
                  })
                  .then((messages) => {
                    if (messages.length > 0 && messages[0].isGame) {
                      this.gameService.removeFromQueue({
                        type: JSON.parse(data.content).type,
                        level: JSON.parse(data.content).level,
                        mode: JSON.parse(data.content).mode,
                        studentId: sender.studentId,
                        on: 'CHANNEL',
                        message: {
                          id: 0,
                          from: {
                            username: sender.username,
                            studentId: sender.studentId,
                            avatar: sender.avatar,
                            status: sender.status,
                          },
                          content: messages[0].content,
                          createdAt: messages[0].createdAt,
                          isGame: true,
                        },
                      });
                    }
                    this.messageEntity.delete({
                      id: messages[0].id,
                    });
                    client.emit('channel/delete/message', {
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
   * @brief Sends a ChannelListItem to the client
   *
   * @listens Socket `channel/get`
   *
   * @param data { id: string, studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/get` { data: ChannelListItem } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/get')
  getChannel(@Body() data: any, @ConnectedSocket() client: Socket) {
    try {
      if (!data || !data.id || !data.studentId)
        client.emit('channel/get', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({
            id: data.id,
          })
          .then((channel) => {
            if (!channel)
              client.emit('channel/get', { error: 'Channel does not exist' });
            else {
              this.userEntity
                .findOne({
                  studentId: data.studentId,
                })
                .then((user) => {
                  this.parseChannel(channel, user).then((parsedChannel) => {
                    client.emit('channel/get', { data: parsedChannel });
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
   * @brief Joins a channel
   *
   * @listens Socket `channel/join`
   *
   * @param data { channelName: string, studentId: string, password?: string }
   *
   * @emits Socket `channel/join` { data: ChannelListItem } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/join')
  joinChannel(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId)
        client.emit('channel/join', { error: 'Invalid data' });
      else {
        this.channelEntity
          .findOne({
            name: data.channelName,
          })
          .then((channel) => {
            if (!channel) return;
            this.comparePassword(data.password, channel.password).then(
              (res) => {
                if (!channel)
                  client.emit('channel/join', {
                    error: 'Channel does not exist',
                  });
                else if (
                  channel.banned.find(
                    (user) => user.studentId === data.studentId,
                  )
                )
                  client.emit('channel/join', {
                    error: 'You are banned from this channel',
                  });
                else if (channel.type === 'PROTECTED' && !res)
                  client.emit('channel/join', { error: 'Invalid password' });
                else {
                  this.channelEntity
                    .update({
                      where: { name: data.channelName },
                      data: {
                        users: {
                          connect: {
                            studentId: data.studentId,
                          },
                        },
                      },
                    })
                    .then((newChannel) => {
                      this.userEntity
                        .update({
                          where: { studentId: data.studentId },
                          data: {
                            channels: {
                              connect: {
                                name: data.channelName,
                              },
                            },
                          },
                        })
                        .then((user) => {
                          this.parseChannel(newChannel, user).then(
                            (parsedChannel) => {
                              client.emit('channel/join', {
                                data: parsedChannel,
                              });
                            },
                          );
                        });
                    });
                }
              },
            );
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Updates a channel (name, avatar, type, password)
   *
   * @listens Socket `channel/update`
   *
   * @param data { oldChannelName: string, newChannelName: string, studentId: string, avatar: string, type: string, password?: string }
   * @param client Socket
   *
   * @emits Socket `channel/update` { data: ChannelListItem } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/update')
  updateChannel(@Body() data, @ConnectedSocket() client) {
    try {
      if (
        !data.oldChannelName ||
        !data.newChannelName ||
        !data.studentId ||
        !data.avatar ||
        !data.type
      )
        client.emit('channel/update', { error: 'Invalid data' });
      else {
        if (data.newChannelName.length < 3)
          client.emit('channel/update', {
            error: 'Channel name must be at least 3 characters long',
          });
        else if (data.newChannelName.length > 20)
          client.emit('channel/update', {
            error: 'Channel name must be at most 20 characters long',
          });
        else if (
          data.type === 'PROTECTED' &&
          (!data.password || data.password === '')
        )
          client.emit('channel/update', { error: 'You must have a password' });
        else {
          this.doesChannelExist(data.newChannelName).then((res) => {
            if (res.data && data.oldChannelName !== data.newChannelName)
              client.emit('channel/update', {
                error: 'Channel already exists',
              });
            else {
              this.hashPassword(data.password).then((hash) => {
                this.channelEntity
                  .update({
                    where: { name: data.oldChannelName },
                    data: {
                      name: data.newChannelName,
                      avatar: data.avatar,
                      type: data.type,
                      ...(data.password && {
                        password: hash,
                      }),
                    },
                  })
                  .then((channel) => {
                    if (!channel) return;
                    this.userEntity
                      .findOne({
                        studentId: data.studentId,
                      })
                      .then((user) => {
                        this.parseChannel(channel, user).then(
                          (parsedChannel) => {
                            client.emit('channel/update', {
                              data: parsedChannel,
                            });
                          },
                        );
                      });
                  });
              });
            }
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Gets the friends of the user that are not in a channel
   *
   * @listens Socket `channel/friends/notIn`
   *
   * @param data { studentId: string, channelName: string }
   * @param client Socket
   *
   * @emits Socket `channel/friends/notIn` { data: User[] } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/friends/notIn')
  getFriendsNotIn(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.studentId || !data.channelName)
        client.emit('channel/friends/notIn', { error: 'Invalid data' });
      else {
        this.userEntity
          .findOne({
            studentId: data.studentId,
          })
          .then((user) => {
            this.channelEntity
              .findOne({
                name: data.channelName,
              })
              .then((channel) => {
                if (!channel) return;
                const _friends = user.friends;
                const friends = _friends.filter(
                  (friend) => friend.username !== 'Bot',
                );
                const friendsNotIn = friends.filter(
                  (friend) =>
                    !channel.users.find(
                      (user) => user.studentId === friend.studentId,
                    ) &&
                    !channel.admins.find(
                      (user) => user.studentId === friend.studentId,
                    ) &&
                    channel.owner.studentId !== friend.studentId &&
                    !channel.banned.find(
                      (user) => user.studentId === friend.studentId,
                    ),
                );
                client.emit('channel/friends/notIn', { data: friendsNotIn });
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async addUsersToChannel(channelName: string, users: User[]) {
    try {
      await Promise.all(
        users.map(async (user) => {
          return await this.channelEntity
            .update({
              where: { name: channelName },
              data: {
                users: {
                  connect: {
                    studentId: user.studentId,
                  },
                },
              },
            })
            .then(async () => {
              return await this.userEntity.update({
                where: { studentId: user.studentId },
                data: {
                  channels: {
                    connect: {
                      name: channelName,
                    },
                  },
                },
              });
            });
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Adds user friends to a channel
   *
   * @listens Socket `channel/add`
   *
   * @param data { users: User[], channelName: string, studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/add` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/add')
  addUsers(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.users || !data.channelName || !data.studentId)
        client.emit('channel/add', { error: 'Invalid data' });
      else {
        this.addUsersToChannel(data.channelName, data.users).then(() => {
          client.emit('channel/add', { success: 'Users added to channel' });
          this.refreshService.updateChannel(data.channelName, data.studentId);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Bans a user from a channel
   *
   * @listens Socket `channel/ban`
   *
   * @param data { channelName: string, studentId: string, friendStudentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/ban` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/ban')
  banUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId || !data.friendStudentId)
        client.emit('channel/ban', { error: 'Invalid data' });
      else {
        this.channelEntity
          .update({
            where: { name: data.channelName },
            data: {
              users: {
                disconnect: {
                  studentId: data.friendStudentId,
                },
              },
              admins: {
                disconnect: {
                  studentId: data.friendStudentId,
                },
              },
              banned: {
                connect: {
                  studentId: data.friendStudentId,
                },
              },
            },
          })
          .then(() => {
            this.userEntity.update({
              where: { studentId: data.friendStudentId },
              data: {
                bannedFrom: {
                  connect: {
                    name: data.channelName,
                  },
                },
                channels: {
                  disconnect: {
                    name: data.channelName,
                  },
                },
                adminOf: {
                  disconnect: {
                    name: data.channelName,
                  },
                },
              },
            });
          })
          .then(() => {
            client.emit('channel/ban', { success: 'User banned' });
            this.refreshService.updateChannel(data.channelName, data.studentId);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Unbans a user from a channel
   *
   * @listens Socket `channel/unban`
   *
   * @param data { channelName: string, studentId: string, friendStudentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/unban` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/unban')
  unbanUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId || !data.friendStudentId)
        client.emit('channel/unban', { error: 'Invalid data' });
      else {
        this.channelEntity
          .update({
            where: { name: data.channelName },
            data: {
              banned: {
                disconnect: {
                  studentId: data.friendStudentId,
                },
              },
            },
          })
          .then(() => {
            this.userEntity
              .update({
                where: { studentId: data.friendStudentId },
                data: {
                  bannedFrom: {
                    disconnect: {
                      name: data.channelName,
                    },
                  },
                },
              })
              .then(() => {
                client.emit('channel/unban', { success: 'User unbanned' });
                this.refreshService.updateChannel(
                  data.channelName,
                  data.studentId,
                );
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Mutes a user from a channel
   *
   * @listens Socket `channel/mute`
   *
   * @param data { channelName: string, friendStudentId: string, time: number }
   * @param client Socket
   *
   * @emits Socket `channel/mute` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/mute')
  muteUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (
        !data.channelName ||
        !data.friendStudentId ||
        !data.time ||
        data.time === -1
      )
        client.emit('channel/mute', { error: 'Invalid data' });
      else if (
        this.muted.find((muted) => muted.studentId === data.friendStudentId)
      )
        client.emit('channel/mute', { error: 'User is already muted' });
      else {
        this.channelEntity
          .update({
            where: { name: data.channelName },
            data: {
              muted: {
                connect: {
                  studentId: data.friendStudentId,
                },
              },
            },
          })
          .then(() => {
            this.userEntity
              .update({
                where: { studentId: data.friendStudentId },
                data: {
                  mutedFrom: {
                    connect: {
                      name: data.channelName,
                    },
                  },
                },
              })
              .then(() => {
                this.muted.push({
                  channelName: data.channelName,
                  studentId: data.friendStudentId,
                  timeout: setTimeout(() => {
                    this.unmuteUser(
                      {
                        channelName: data.channelName,
                        friendStudentId: data.friendStudentId,
                      },
                      null,
                    );
                  }, data.time * 60 * 1000),
                });
                client.emit('channel/mute', { success: 'User muted' });
                if (data.studentId)
                  this.refreshService.updateChannel(
                    data.channelName,
                    data.studentId,
                  );
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Unmutes a user from a channel
   *
   * @listens Socket `channel/unmute`
   *
   * @param data { channelName: string, friendStudentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/unmute` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/unmute')
  unmuteUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.friendStudentId)
        client.emit('channel/unmute', { error: 'Invalid data' });
      else {
        const index = this.muted.findIndex(
          (muted) =>
            muted.studentId === data.friendStudentId &&
            muted.channelName === data.channelName,
        );
        if (index !== -1) {
          clearTimeout(this.muted[index].timeout);
          this.muted.splice(index, 1);
          this.channelEntity
            .update({
              where: { name: data.channelName },
              data: {
                muted: {
                  disconnect: {
                    studentId: data.friendStudentId,
                  },
                },
              },
            })
            .then(() => {
              this.userEntity
                .update({
                  where: { studentId: data.friendStudentId },
                  data: {
                    mutedFrom: {
                      disconnect: {
                        name: data.channelName,
                      },
                    },
                  },
                })
                .then(() => {
                  if (client)
                    client.emit('channel/unmute', { success: 'User unmuted' });
                  if (data.studentId)
                    this.refreshService.updateChannel(
                      data.channelName,
                      data.studentId,
                    );
                });
            });
        } else {
          if (client)
            client.emit('channel/unmute', { error: 'User is not muted' });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Leaves a channel
   *
   * @listens Socket `channel/leave`
   *
   * @param data { channelName: string, studentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/leave` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/leave')
  leaveChannel(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId)
        client.emit('channel/leave', { error: 'Invalid data' });
      else if (data.channelName === 'Transcendence Lobby')
        client.emit('channel/leave', {
          error: 'You cannot leave this channel',
        });
      else {
        this.userEntity
          .findOne({
            studentId: data.studentId,
          })
          .then((user) => {
            this.channelEntity
              .findOne({
                name: data.channelName,
              })
              .then((channel) => {
                this.ownerLeaves(user, channel).then((ownerLeaves) => {
                  if (ownerLeaves)
                    client.emit('channel/leave', { success: 'Owner left' });
                  else {
                    this.adminLeaves(user, channel).then((adminLeaves) => {
                      if (adminLeaves)
                        client.emit('channel/leave', { success: 'Admin left' });
                      else {
                        this.userLeaves(user, channel).then((userLeaves) => {
                          if (userLeaves)
                            client.emit('channel/leave', {
                              success: 'User left',
                            });
                          else
                            client.emit('channel/leave', {
                              error: 'User is not in the channel!',
                            });
                        });
                      }
                    });
                  }
                });
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Promotes a user to admin
   *
   * @listens Socket `channel/promote`
   *
   * @param data { channelName: string, studentId: string, friendStudentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/promote` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/promote')
  promoteUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId || !data.friendStudentId)
        client.emit('channel/promote', { error: 'Invalid data' });
      else {
        this.channelEntity
          .update({
            where: { name: data.channelName },
            data: {
              admins: {
                connect: {
                  studentId: data.friendStudentId,
                },
              },
              users: {
                disconnect: {
                  studentId: data.friendStudentId,
                },
              },
            },
          })
          .then(() => {
            this.userEntity
              .update({
                where: { studentId: data.friendStudentId },
                data: {
                  adminOf: {
                    connect: {
                      name: data.channelName,
                    },
                  },
                  channels: {
                    disconnect: {
                      name: data.channelName,
                    },
                  },
                },
              })
              .then(() => {
                client.emit('channel/promote', { success: 'User promoted' });
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @brief Demotes a user from admin
   *
   * @listens Socket `channel/demote`
   *
   * @param data { channelName: string, studentId: string, friendStudentId: string }
   * @param client Socket
   *
   * @emits Socket `channel/demote` { success: string } | { error: string }
   * @returns void
   */
  @SubscribeMessage('channel/demote')
  demoteUser(@Body() data, @ConnectedSocket() client) {
    try {
      if (!data.channelName || !data.studentId || !data.friendStudentId)
        client.emit('channel/demote', { error: 'Invalid data' });
      else {
        this.channelEntity
          .update({
            where: { name: data.channelName },
            data: {
              admins: {
                disconnect: {
                  studentId: data.friendStudentId,
                },
              },
              users: {
                connect: {
                  studentId: data.friendStudentId,
                },
              },
            },
          })
          .then(() => {
            this.userEntity
              .update({
                where: { studentId: data.friendStudentId },
                data: {
                  adminOf: {
                    disconnect: {
                      name: data.channelName,
                    },
                  },
                  channels: {
                    connect: {
                      name: data.channelName,
                    },
                  },
                },
              })
              .then(() => {
                client.emit('channel/demote', { success: 'User demoted' });
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

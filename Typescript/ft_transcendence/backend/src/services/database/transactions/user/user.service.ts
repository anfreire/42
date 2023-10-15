import { Body, Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user/user.service';
import {
  User,
  UserData,
  UserDataOptions,
  UserState,
  UserStatus,
  Users,
} from './user.interface';
import { Data, Error, Response } from 'src/app.interface';
import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { ChannelEntity } from '../../entities/channel/channel.service';
import { ChatEntity } from '../../entities/chat/chat.service';
import { ChatService } from '../chat/chat.service';
import { Server } from 'socket.io';
import myGateway from 'src/services/gateway/gateway.decorator';
import { UserExtended } from '../../entities/entities.interface';
import { $Enums, Prisma, User as PrismaUser } from '@prisma/client';
import { GameService } from '../game/game.service';
import { GameEntity } from '../../entities/game/game.service';
import { AchievementsEntity } from '../../entities/achievements/achievements.service';

@Injectable()
@myGateway()
export class UserService {
  private readonly stillOnline: string[] = [];
  private readonly avatars: { studentId: string; avatar: string }[] = [];
  constructor(
    private readonly userEntity: UserEntity,
    private readonly channelEntity: ChannelEntity,
    private readonly chatService: ChatService,
    private readonly chatEntity: ChatEntity,
    private readonly gameService: GameService,
    private readonly achievementsEntity: AchievementsEntity,
    private readonly gameEntity: GameEntity,
  ) {}

  @WebSocketServer() server: Server;

  /**
   * @async
   *
   * @brief Retrive the user data
   *
   * @param studentId string
   * @param type 'EDIT' | 'LOGIN'
   *
   * @return Promise<Data<UserData> | Error>
   *
   * @details This function will be called by the controller `get` function
   * @note The difference between this one and the bellow is that this function is mainly to retrieve the essential user data.
   * @note Either for identification AFTER the login or to display the old data on the edit page
   */
  async getUserData(
    studentId: string,
    type: 'LOGIN' | 'EDIT',
  ): Promise<Data<UserData> | Error> {
    try {
      const user = await this.userEntity.findOne({
        studentId,
      });
      if (!user) return { error: 'User not found' };
      if (type === 'LOGIN') {
        this.server.to(user.socket).emit('closeOnCommand', { data: 'close' });
      }
      const toReturn = user;
      delete toReturn.avatar;
      return { data: toReturn };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Checks if the user is blocked by another user
   *
   * @param users Users
   *
   * @return Promise<Data<boolean> | Error>
   * @details This function will be called by the controller `isBlocked` function
   */
  async isBlocked(users: Users): Promise<boolean> {
    try {
      const user1 = await this.userEntity.findOne({
        studentId: users.studentId,
      });
      const user2 = await this.userEntity.findOne({
        studentId: users.friendStudentId,
      });
      return user1.blocked.some(
        (blocked) => blocked.studentId === user2.studentId,
      )
        ? true
        : false;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/get`
   *
   * @brief Retrive the user data
   *
   * @param data { studentId: string; friendStudentId: string }
   * @param client Socket
   *
   * @return void
   *
   * @details This function will be called mainly by other users
   * @note This function will get a complete user data including avatar and games.
   * @note It has a large payload for the requests
   */
  @SubscribeMessage('user/get')
  getUser(
    @Body() data: { studentId: string; friendStudentId: string },
    @ConnectedSocket() client,
  ): void {
    try {
      this.userEntity
        .findOne({
          studentId: data.friendStudentId,
        })
        .then((user) => {
          if (!user) client.emit('user/get', { error: 'User not found' });
          else {
            let userToEmit: any = {};
            this.isFriend(data).then((isFriendData) => {
              userToEmit.isFriend = (isFriendData as Data<boolean>).data;
              return Promise.all(
                user.games.map((_game) => {
                  return this.gameEntity
                    .findOne({ id: _game.id })
                    .then((game) => {
                      return {
                        id: game.id,
                        players: game.players.map((player) => {
                          return {
                            studentId: player.studentId,
                            username: player.username,
                            avatar: player.avatar,
                            status: player.status,
                          };
                        }),
                        points: game.points,
                        mode: game.mode,
                        ...(game.winner
                          ? {
                              winner: {
                                studentId: game.winner.studentId,
                                username: game.winner.username,
                                avatar: game.winner.avatar,
                                status: game.winner.status,
                              },
                            }
                          : {}),
                        ...(game.loser
                          ? {
                              loser: {
                                studentId: game.loser.studentId,
                                username: game.loser.username,
                                avatar: game.loser.avatar,
                                status: game.loser.status,
                              },
                            }
                          : {}),
                      };
                    });
                }),
              ).then((games) => {
                this.isBlocked(data).then((isBlocked) => {
                  userToEmit = {
                    ...userToEmit,
                    studentId: user.studentId,
                    username: user.username,
                    avatar: user.avatar,
                    status: user.status,
                    achievements: user.achievements,
                    games: games,
                    isBlocked: isBlocked,
                  };
                  client.emit('user/get', { data: userToEmit });
                });
              });
            });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Get the user data
   *
   * @param studentId string
   * @param data UserData
   *
   * @return Promise<Data<UserData> | Error>
   *
   * @details This function will be called by the controller `update` function
   */
  async updateUserData(studentId: string, data: UserData): Promise<Response> {
    try {
      const user = await this.userEntity.findOne({
        studentId: studentId,
      });
      if (!user) return { error: 'User not found' };
      const res = await this.checkUserData(data);
      if (res.error) return res;
      delete data.achievements;
      this.userEntity.update({
        where: { studentId: studentId },
        data: data as Prisma.UserUpdateInput,
      });
      return { success: 'User updated successfully' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Updates the user socket
   *
   * @param studentId string
   * @param socket string
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `updateSocket` function
   */
  async updateUserSocket(studentId: string, socket: string): Promise<Response> {
    try {
      const res = await this.userEntity.update({
        where: { studentId: studentId },
        data: { socket },
      });
      if (!res) return { error: 'User not found' };
      return { success: 'User socket updated successfully' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Updates the user status
   *
   * @param studentId string
   * @param status UserStatus
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `updateStatus` function
   */
  async updateUserStatus(
    studentId: string,
    status: UserStatus,
  ): Promise<Response> {
    try {
      const res = await this.userEntity.update({
        where: { studentId: studentId },
        data: { status },
      });
      if (!res) return { error: 'User not found' };
      return { success: 'User status updated successfully' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Gets the user state (registered or not)
   *
   * @param studentId string
   *
   * @return Promise<Data<UserState>>
   *
   * @details This function will be called by the controller `getUserState` function
   */
  async getUserState(studentId: string): Promise<Data<UserState>> {
    try {
      const user = await this.userEntity.findOne({
        studentId,
      });
      return user
        ? { data: UserState.REGISTERED }
        : { data: UserState.UNREGISTERED };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Removes and returns the user avatar from the avatars array
   *
   * @param studentId string
   *
   * @return Promise<Data<string | null>>
   *
   * @details This is a helper function to save the avatar when the user is editing on registring
   * @details The avatar is sent in a different time than the confirmation of the user data because has a large payload
   */
  spliceAvatar(studentId: string): Data<string | null> {
    try {
      const avatar = this.avatars.splice(
        this.avatars.findIndex((avatar) => avatar.studentId === studentId),
        1,
      );
      if (avatar.length === 0) return { data: null };
      return { data: avatar[0].avatar };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/avatar/save`
   *
   * @brief Updates the user avatar
   *
   * @param data { studentId: string; avatar: string }
   *
   * @return void
   * @emits Socket `user/avatar/save`
   *
   * @details This function saves the avatar in a temporary array for when the user finishes editing or registering
   */
  @SubscribeMessage('user/avatar/save')
  saveAvatar(@Body() data: { studentId: string; avatar: string }): void {
    try {
      if (!data || !data.studentId || !data.avatar) return;
      // delete a saved avatar, if any
      this.spliceAvatar(data.studentId);
      // Check if user is registered
      this.getUserState(data.studentId).then((state) => {
        // if registered update the user data on the database
        if (state.data === UserState.REGISTERED) {
          this.userEntity.update({
            where: { studentId: data.studentId },
            data: { avatar: data.avatar },
          });
        } else {
          // else save the avatar in the avatars array
          this.avatars.push({ studentId: data.studentId, avatar: data.avatar });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/avatar/get`
   *
   * @brief Gets the user avatar
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @return void
   * @emits Socket `user/avatar/get`
   *
   * @details This function will only send the user avatar, because the avatar is a large payload
   */
  @SubscribeMessage('user/avatar/get')
  getAvatar(
    @Body() data: { studentId: string },
    @ConnectedSocket() client,
  ): Promise<void> {
    try {
      if (!data || !data.studentId) return;
      this.userEntity
        .findOne({
          studentId: data.studentId,
        })
        .then((user) => {
          client.emit('user/avatar/get', {
            data: user.avatar,
          });
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Checks if the username is already taken
   *
   * @param username string
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `checkUsername` function
   */
  async checkUsername(username: string): Promise<Response> {
    try {
      const user = await this.userEntity.findOne({
        username,
      });
      return user
        ? { error: 'Username already taken' }
        : { success: 'Available' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Checks if the user data is valid
   *
   * @param user UserData
   *
   * @return Promise<Response>
   *
   * @details This function is a helper function to check if the user data is valid
   */
  async checkUserData(user: UserData): Promise<Response> {
    try {
      user.username = user.username.trim();
      if (!user) return { error: 'Missing user data' };
      else if (!user.studentId) return { error: 'Missing studentId' };
      else if (!user.username) return { error: 'Missing username' };
      else if (!user.twoFA) return { error: 'Missing twoFA' };
      else if (user.twoFA == 'GOOGLE' && (!user.gmail || user.gmail == ''))
        return { error: 'Missing confirmed gmail for 2FA' };
      else if (user.twoFA == 'PHONE' && (!user.phone || user.phone == ''))
        return { error: 'Missing confirmed phone for 2FA' };
      else if (user.color in $Enums.color === false)
        return { error: 'Invalid color' };
      return { success: 'User data is valid' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Checks if the user phone is valid
   *
   * @param phone string
   *
   * @return Promise<Response>
   *
   * @details This function is called by the controller `checkPhone` function
   */
  checkUserPhone(phone: string): Response {
    try {
      if (!phone || phone.length === 0) return { error: 'Number is empty' };
      else if (phone.length !== 9) return { error: 'Number must be 9 digits' };
      else if (!phone.match(/^[0-9]+$/))
        return { error: 'Number must be digits' };
      else if (phone[0] !== '9') return { error: 'Number must start with 9' };
      else return { success: 'Number is valid' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Adds the bot has a friend and creates a chat between the user and the bot
   *
   * @param studentId string
   *
   * @return Promise<void>
   *
   * @details This function is helper function that will be called on register
   */
  async afterRegister(studentId: string): Promise<void> {
    try {
      // Add the user to the lobby
      await this.channelEntity.update({
        where: { name: 'Transcendence Lobby' },
        data: {
          users: {
            connect: {
              studentId,
            },
          },
        },
      });
      // make the user friends with the bot
      const bot = await this.userEntity.update({
        where: { username: 'Bot' },
        data: {
          friends: {
            connect: {
              studentId,
            },
          },
        },
      });
      await this.userEntity.update({
        where: { studentId },
        data: {
          friends: {
            connect: {
              studentId: bot.studentId,
            },
          },
        },
      });
      // create a chat between the user and the bot
      const chat = await this.chatEntity.create({
        name: this.chatService.getChatName({
          studentId: bot.studentId,
          friendStudentId: studentId,
        }),
        users: {
          connect: [
            {
              studentId: bot.studentId,
            },
            {
              studentId,
            },
          ],
        },
        messages: {
          create: [
            {
              isGame: true,
              content: JSON.stringify({
                type: 'DUO',
                level: 'EASY',
                mode: 'CLASSIC',
              }),
              sender: {
                connect: {
                  studentId: bot.studentId,
                },
              },
            },
            {
              content: 'Welcome to Transcendence!',
              sender: {
                connect: {
                  studentId: bot.studentId,
                },
              },
            },
          ],
        },
      });

      const message = chat.messages.find(
        (message) =>
          message.content ===
          JSON.stringify({
            type: 'DUO',
            level: 'EASY',
            mode: 'CLASSIC',
          }),
      );
      this.gameService.addToQueue({
        studentId: bot.studentId,
        type: 'DUO',
        level: 'EASY',
        mode: 'CLASSIC',
        on: 'CHAT',
        message: {
          id: message.id,
          from: {
            studentId: bot.studentId,
            username: bot.username,
            avatar: bot.avatar,
            status: bot.status,
          },
          content: message.content,
          createdAt: message.createdAt,
          isGame: true,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Registers the user
   *
   * @param user UserData
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `register` function
   */
  async register(user: UserData): Promise<Response> {
    try {
      const result = await this.checkUserData(user);
      if (result.error) return result;
      else if ((await this.checkUsername(user.username)).error)
        return { error: 'Username already taken' };
      const avatar = this.spliceAvatar(user.studentId).data;
      if (!avatar) return { error: 'Missing avatar' };
      const achievements = await this.achievementsEntity.create({});
      const data = {
        socket: user.socket,
        studentId: user.studentId,
        twoFA: user.twoFA,
        username: user.username,
        avatar: avatar,
        color: user.color,
        gmail: user.gmail,
        phone: user.phone,
        status: 'ONLINE' as UserStatus,
        achievements: {
          connect: {
            id: achievements.id,
          },
        },
      };
      try {
        await this.userEntity.create(data);
        await this.afterRegister(user.studentId);
        return { success: 'User created successfully' };
      } catch (error) {
        this.avatars.push({ studentId: user.studentId, avatar });
        return { error: 'Error creating user' };
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Logs the user in
   *
   * @param user UserData
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `login` function
   */
  async login(user: UserData): Promise<Response> {
    //----------------------------------------------------------------
    // Anonymous function to update the user socket and status
    const update = async (user: UserData) => {
      await this.userEntity.update({
        where: { studentId: user.studentId },
        data: {
          socket: user.socket,
          status: 'ONLINE' as UserStatus,
        },
      });
      return { success: 'User successfully logged in' };
    };
    //----------------------------------------------------------------
    try {
      if (!user || !user.studentId || !user.socket || !user.twoFA)
        return { error: 'Missing user data' };
      const registeredUser = await this.userEntity.findOne({
        studentId: user.studentId,
      });
      if (!registeredUser) return { error: 'User not found' };
      switch (user.twoFA) {
        case 'GOOGLE':
          return user.gmail === registeredUser.gmail
            ? await update(user)
            : { error: 'Use the email you used to register' };
        case 'PHONE':
          return user.phone === registeredUser.phone
            ? await update(user)
            : { error: 'Use the phone you used to register' };
        case 'NONE':
          return await update(user);
        default:
          return { error: 'Invalid 2FA' };
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/friends/list`
   *
   * @brief Sends the user friends list
   *
   * @param data { studentId: string }
   * @param client Socket
   *
   * @emits Socket `user/friends/list`
   * @return void
   */
  @SubscribeMessage('user/friends/list')
  getFriends(@Body() data, @ConnectedSocket() client): void {
    try {
      if (!data.studentId)
        client.emit('user/friends/list', { error: 'Missing studentId' });
      else {
        this.userEntity.findOne({ studentId: data.studentId }).then((user) => {
          if (!user)
            client.emit('user/friends/list', { error: 'User not found' });
          else {
            let friends = user.friends.map((friend) => {
              if (
                user.blocked.some(
                  (blocked) => blocked.studentId === friend.studentId,
                )
              )
                return null;
              return {
                username: friend.username,
                studentId: friend.studentId,
                avatar: friend.avatar,
                status: friend.status,
              };
            });
            friends = friends.filter((friend) => friend !== null);
            client.emit('user/friends/list', { data: friends });
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Checks if the user is friend with another user
   *
   * @param data Users
   *
   * @return Promise<Data<boolean> | Error>
   *
   * @details This function will be called by the controller `isFriend` function
   */
  async isFriend(data: Users): Promise<Data<boolean> | Error> {
    try {
      if (!data || !data.friendStudentId || !data.studentId)
        return { error: 'Invalid data' };
      const user1 = await this.userEntity.findOne({
        studentId: data.friendStudentId,
      });
      if (!user1) return { error: 'User not found' };
      const user2 = await this.userEntity.findOne({
        studentId: data.studentId,
      });
      if (!user2) return { error: 'User not found' };
      const user1ToUser2 = user1.friends.some(
        (friend) => friend.studentId === data.studentId,
      );
      const user2ToUser1 = user2.friends.some(
        (friend) => friend.studentId === data.friendStudentId,
      );
      if (user1ToUser2 === !user2ToUser1)
        return {
          error:
            'Something went wrong, user1 is friend of user2, but user2 is not friend of user1',
        };
      else if (user1ToUser2 === true && user2ToUser1 === true)
        return { data: true };
      else return { data: false };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Makes two users friends
   *
   * @param data Users
   *
   * @return Promise<void>
   *
   * @details This function is a helper function that will be called by the fucntions to  accept friend requests
   */
  async makeFriend(data: Users): Promise<void> {
    try {
      await this.userEntity.update({
        where: { studentId: data.friendStudentId },
        data: {
          friends: {
            connect: {
              studentId: data.studentId,
            },
          },
        },
      });
      await this.userEntity.update({
        where: { studentId: data.studentId },
        data: {
          friends: {
            connect: {
              studentId: data.friendStudentId,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/friendRequests/list`
   *
   * @brief Sends the user friend requests list
   *
   * @param data { studentId: string }
   *
   * @emits Socket `user/friendRequests/list`
   * @return void
   */
  @SubscribeMessage('user/friendRequests/list')
  getFriendRequests(@Body() data, @ConnectedSocket() client) {
    try {
      this.userEntity
        .findOne({
          studentId: data.studentId,
        })
        .then((user) => {
          if (!user)
            client.emit('user/friendRequests/list', {
              error: 'User not found',
            });
          else {
            const friendRequests = user.friendRequests.map((request) => {
              return {
                username: request.username,
                studentId: request.studentId,
                avatar: request.avatar,
                status: request.status,
              };
            });
            client.emit('user/friendRequests/list', { data: friendRequests });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Removes a friend request
   *
   * @param studentId string
   * @param friendStudentId string
   *
   * @return Promise<void>
   *
   * @details This function is a helper function that will be called by the functions to accept or decline friend requests
   */
  async removeFriendRequest(studentId: string, friendStudentId: string) {
    try {
      await this.userEntity.update({
        where: { studentId: friendStudentId },
        data: {
          friendRequests: {
            disconnect: {
              studentId: studentId,
            },
          },
        },
      });
      await this.userEntity.update({
        where: { studentId: studentId },
        data: {
          friendRequests: {
            disconnect: {
              studentId: friendStudentId,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Sends a friend request
   *
   * @param data Users
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `sendFriendRequest` function
   */
  async sendFriendRequest(data: Users): Promise<Response> {
    try {
      const isFriend = (await this.isFriend(data)) as any;
      if (isFriend.error) return isFriend;
      else if (isFriend.data) return { error: 'You are already friends' };
      const friendRequestReciever = await this.userEntity.findOne({
        studentId: data.friendStudentId,
      });
      const friendRequestSender = await this.userEntity.findOne({
        studentId: data.studentId,
      });
      if (
        friendRequestSender.friendRequests.some(
          (request) => request.studentId === friendRequestReciever.studentId,
        )
      ) {
        await this.makeFriend(data);
        this.removeFriendRequest(data.studentId, data.friendStudentId);
        return {
          success: 'This user sent you a friend request, you are now friends',
        };
      } else if (
        friendRequestReciever.friendRequests.some(
          (request) => request.studentId === friendRequestSender.studentId,
        )
      )
        return { error: 'Friend request already sent' };
      await this.userEntity.update({
        where: { studentId: friendRequestReciever.studentId },
        data: {
          friendRequests: {
            connect: {
              studentId: friendRequestSender.studentId,
            },
          },
        },
      });
      return { success: 'Friend request sent' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Accepts a friend request
   *
   * @param data Users
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `acceptFriendRequest` function
   */
  async acceptFriendRequest(data: Users): Promise<Response> {
    try {
      const isFriend = (await this.isFriend(data)) as any;
      if (isFriend.error) return isFriend;
      else if (isFriend.data) return { error: 'You are already friends' };
      const whoAccepts = await this.userEntity.findOne({
        studentId: data.studentId,
      });
      const whoSent = await this.userEntity.findOne({
        studentId: data.friendStudentId,
      });
      if (
        !whoAccepts.friendRequests.some(
          (request) => request.studentId === whoSent.studentId,
        )
      )
        return { error: 'Friend request not found' };
      await this.makeFriend(data);
      await this.removeFriendRequest(data.studentId, data.friendStudentId);
      return { success: 'Friend request accepted' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Declines a friend request
   *
   * @param data Users
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `declineFriendRequest` function
   */
  async declineFriendRequest(data: Users): Promise<Response> {
    try {
      const isFriend = (await this.isFriend(data)) as any;
      if (isFriend.error) return isFriend;
      else if (isFriend.data) return { error: 'You are already friends' };
      const whoDeclines = await this.userEntity.findOne({
        studentId: data.studentId,
      });
      const whoSent = await this.userEntity.findOne({
        studentId: data.friendStudentId,
      });
      if (
        !whoDeclines.friendRequests.some(
          (request) => request.studentId === whoSent.studentId,
        )
      )
        return { error: 'Friend request not found' };
      await this.removeFriendRequest(data.studentId, data.friendStudentId);
      return { success: 'Friend request declined' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Removes a friend
   *
   * @param data Users
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `removeFriend` function
   */
  async removeFriend(data: Users): Promise<Response> {
    try {
      const isFriend = (await this.isFriend(data)) as any;
      if (isFriend.error) return isFriend;
      else if (!isFriend.data) return { error: 'You are not friends' };
      else if (data.friendStudentId === '0')
        return { error: 'Bot will always be your friend' };
      await this.userEntity.update({
        where: { studentId: data.studentId },
        data: {
          friends: {
            disconnect: {
              studentId: data.friendStudentId,
            },
          },
        },
      });
      await this.userEntity.update({
        where: { studentId: data.friendStudentId },
        data: {
          friends: {
            disconnect: {
              studentId: data.studentId,
            },
          },
        },
      });
      return { success: 'Friend removed' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Blocks a user
   *
   * @param data { studentId: string; friendStudentId: string }
   *
   * @return Promise<Response>
   *
   * @details This function will be called by the controller `blockUser` function
   */
  async blockUser(data: {
    studentId: string;
    friendStudentId: string;
  }): Promise<Response> {
    try {
      if (!data || !data.studentId || !data.friendStudentId)
        return { error: 'Invalid data' };
      const user = await this.userEntity.findOne({
        studentId: data.studentId,
      });
      const isBlocked = user.blocked.some(
        (blocked) => blocked.studentId === data.friendStudentId,
      );
      if (data.friendStudentId === '0') {
        return { error: 'Cannot block the mighty bot' };
      }
      if (!isBlocked) {
        await this.userEntity.update({
          where: { studentId: data.studentId },
          data: {
            blocked: {
              connect: {
                studentId: data.friendStudentId,
              },
            },
          },
        });
        return { success: 'User blocked' };
      }
      await this.userEntity.update({
        where: { studentId: data.studentId },
        data: {
          blocked: {
            disconnect: {
              studentId: data.friendStudentId,
            },
          },
        },
      });

      return { success: 'User unblocked' };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @listens Socket `user/blocked/list`
   *
   * @brief Sends the user blocked list
   *
   * @param data { studentId: string }
   *
   * @emits Socket `user/blocked/list`
   * @return void
   */
  @SubscribeMessage('user/blocked/list')
  getBlocked(@Body() data, @ConnectedSocket() client) {
    try {
      this.userEntity
        .findOne({
          studentId: data.studentId,
        })
        .then((user) => {
          if (!user)
            client.emit('user/blocked/list', { error: 'User not found' });
          else {
            const blocked = user.blocked.map((blocked) => {
              return {
                username: blocked.username,
                studentId: blocked.studentId,
                avatar: blocked.avatar,
                status: blocked.status,
              };
            });
            client.emit('user/blocked/list', { data: blocked });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }
}

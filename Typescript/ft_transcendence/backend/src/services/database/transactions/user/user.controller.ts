import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserData, UserState, UserStatus, Users } from './user.interface';
import { Data, Error, Response } from 'src/app.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @async
   *
   * @listens GET /user/get/:studentId/:type
   *
   * @brief Get user data
   *
   * @param studentId string
   * @param type 'EDIT' | 'LOGIN'
   *
   * @return Promise<Data<UserData> | Error>
   *
   * @details This function will use the service `getUserData` to get the user data
   * @note Is only call by the user itself on the login page or the edit page
   */
  @Get('get/:studentId/:type')
  async get(
    @Param('studentId') studentId: string,
    @Param('type') type: 'EDIT' | 'LOGIN',
  ): Promise<Data<UserData> | Error> {
    try {
      return await this.userService.getUserData(studentId, type);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/update/:studentId
   *
   * @brief Update user data
   *
   * @param studentId string
   * @param data UserData
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `updateUserData` to update the user data
   */
  @Post('update/:studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() data,
  ): Promise<Response> {
    try {
      return await this.userService.updateUserData(studentId, data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/update/status/:studentId
   *
   * @brief Update user status ('ONLINE' | 'OFFLINE' | 'IN_GAME')
   *
   * @param studentId string
   * @param data { status: UserStatus}
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `updateUserStatus` to update the user status
   */
  @Post('update/status/:studentId')
  async updateStatus(
    @Param('studentId') studentId: string,
    @Body() data,
  ): Promise<Response> {
    try {
      if (!data || !data.status) return { error: 'Invalid data' };
      return await this.userService.updateUserStatus(studentId, data.status);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/update/socket/:studentId
   *
   * @brief Update user socket
   *
   * @param studentId string
   * @param data { socket: string }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `updateUserSocket` to update the user socket
   */
  @Post('update/socket/:studentId')
  async updateSocket(
    @Param('studentId') studentId: string,
    @Body() data,
  ): Promise<Response> {
    try {
      if (!data || !data.socket) return { error: 'Invalid data' };
      return await this.userService.updateUserSocket(studentId, data.socket);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens GET /user/state/:studentId
   *
   * @brief Get user state ('REGISTERED' | 'UNREGISTERED')
   *
   * @param studentId string
   *
   * @return Promise<Data<UserState>>
   *
   * @details This function will use the service `getUserState` to get the user state
   */
  @Get('state/:studentId')
  async getUserState(
    @Param('studentId') studentId: string,
  ): Promise<Data<UserState>> {
    try {
      return await this.userService.getUserState(studentId);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens GET /user/check/username/:username
   *
   * @brief Check if username is already taken
   *
   * @param username string
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `checkUsername` to check if username is already taken
   */
  @Get('check/username/:username')
  async checkUsername(@Param('username') username: string): Promise<Response> {
    try {
      return await this.userService.checkUsername(username);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens GET /user/check/phone/:phone
   *
   * @brief Check if phone is valid
   *
   * @param phone string
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `checkUserPhone` to check if phone is valid
   */
  @Get('check/phone/:phone')
  checkPhone(@Param('phone') phone: string): Response {
    try {
      return this.userService.checkUserPhone(phone);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/register
   *
   * @brief Register user
   *
   * @param data UserData
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `register` to register the user
   */
  @Post('register')
  async register(@Body() data: UserData): Promise<Response> {
    try {
      return await this.userService.register(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/login
   *
   * @brief Login user
   *
   * @param data UserData
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `login` to login the user
   */
  @Post('login')
  async login(@Body() data: UserData): Promise<Response> {
    try {
      return await this.userService.login(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friends/isFriend
   *
   * @brief Check if two users are friends
   *
   * @param data { studentId: string, friendStudentId: string }
   *
   * @return Promise<Data<boolean> | Error>
   *
   * @details This function will use the service `isFriend` to check if two users are friends
   */
  @Post('friends/isFriend')
  async isFriend(@Body() data: any): Promise<Data<boolean> | Error> {
    try {
      return await this.userService.isFriend(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friendRequests/send
   *
   * @brief Send friend request
   *
   * @param data { studentId: string, friendStudentId: string }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `sendFriendRequest` to send friend request
   */
  @Post('friendRequests/send')
  async sendFriendRequest(@Body() data: any): Promise<Response> {
    try {
      return await this.userService.sendFriendRequest(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friendRequests/accept
   *
   * @brief Accept friend request
   *
   * @param data  { studentId: string, friendStudentId: string }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `acceptFriendRequest` to accept friend request
   */
  @Post('friendRequests/accept')
  async acceptFriendRequest(@Body() data: Users): Promise<Response> {
    try {
      return await this.userService.acceptFriendRequest(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friendRequests/decline
   *
   * @brief Decline friend request
   *
   * @param data { studentId: string, friendStudentId: string }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `declineFriendRequest` to decline friend request
   */
  @Post('friendRequests/decline')
  async declineFriendRequest(@Body() data: Users): Promise<Response> {
    try {
      return await this.userService.declineFriendRequest(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friends/remove
   *
   * @brief Remove friend
   *
   * @param data { studentId: string, friendStudentId: string }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `removeFriend` to remove friend
   */
  @Post('friends/remove')
  async removeFriend(@Body() data: Users): Promise<Response> {
    try {
      return await this.userService.removeFriend(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @async
   *
   * @listens POST /user/friends/block
   *
   * @brief Block user
   *
   * @param data { studentId: string, friendStudentId: string, op: 'BLOCK' | 'UNBLOCK' }
   *
   * @return Promise<Response>
   *
   * @details This function will use the service `blockUser` to block user
   */
  @Post('block')
  async blockUser(
    @Body()
    data: {
      studentId: string;
      friendStudentId: string;
      op: 'BLOCK' | 'UNBLOCK';
    },
  ): Promise<Response> {
    try {
      return await this.userService.blockUser(data);
    } catch (error) {
      console.error(error);
    }
  }
}

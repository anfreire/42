import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Data, Response } from 'src/app.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @async
   *
   * @brief Returns the 42 student id from the code
   *
   * @listens GET /auth/42/:code
   *
   * @param code string
   *
   * @returns Promise<Response | Data<string>>
   *
   * @note This function will call the service `getStudentId`
   */
  @Get('42/:code')
  async getStudentId(
    @Param('code') code: string,
  ): Promise<Response | Data<string>> {
    try {
      return this.authService.getStudentId(code);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Returns the google id from the token
   *
   * @listens GET /auth/google/:token_type/:access_token
   *
   * @param token_type string
   * @param access_token string
   *
   * @returns Promise<Response | Data<string>>
   *
   * @note This function will call the service `getGoogleId`
   */
  @Get('google/:token_type/:access_token')
  async getGoogleId(
    @Param('token_type') token_type: string,
    @Param('access_token') access_token: string,
  ): Promise<Response | Data<string>> {
    try {
      return this.authService.getGoogleId(token_type, access_token);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Returns the code sent to the phone number
   *
   * @listens GET /auth/phone/:number
   *
   * @param number string
   *
   * @returns Data<string>
   *
   * @note This function will call the service `sendSMS`
   */
  @Get('phone/:number')
  getCodeSent(@Param('number') number: string): Data<string> {
    try {
      return this.authService.sendSMS(number);
    } catch (e) {
      console.error(e);
    }
  }
}

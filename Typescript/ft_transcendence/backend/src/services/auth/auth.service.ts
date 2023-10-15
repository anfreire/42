import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Data, Response } from 'src/app.interface';

@Injectable()
export class AuthService {
  private readonly _client_id: string;
  private readonly _client_secret: string;
  private readonly _redirect_uri: string;

  constructor(private readonly config: ConfigService) {
    this._client_id = this.config.get<string>('VITE_42_ID');
    this._client_secret = this.config.get<string>('VITE_42_SECRET');
    this._redirect_uri = this.config.get<string>('VITE_42_CALLBACK_URL');
  }

  /**
   * @async
   *
   * @brief Returns the 42 student id from the code
   *
   * @param code string
   *
   * @returns Promise<Response | Data<string>>
   *
   * @note This function is called by the controller `getStudentId`
   */
  async getStudentId(code: string): Promise<Response | Data<string>> {
    try {
      const toSend = {
        grant_type: 'authorization_code',
        client_id: this._client_id,
        client_secret: this._client_secret,
        code: code,
        redirect_uri: this._redirect_uri,
      };
      const responseToken = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend),
      });
      const tokens = await responseToken.json();
      if (tokens.error || !tokens.access_token)
        return { error: 'Unable to fetch the 42 credentials' };
      const response = await fetch('https://api.intra.42.fr/v2/me', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });
      const dataRetrieved = await response.json();
      return { data: dataRetrieved.id.toString() };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   *
   * @brief Returns the google id from the token
   *
   * @param token_type string
   * @param access_token string
   *
   * @returns Promise<Data<string>>
   *
   * @note This function is called by the controller `getGoogleId`
   */
  async getGoogleId(
    token_type: string,
    access_token: string,
  ): Promise<Data<string>> {
    try {
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token_type} ${access_token}`,
          },
        },
      );
      const data = await response.json();
      return { data: data.id };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @brief Sends a SMS to the phone number
   *
   * @param phone string
   *
   * @returns Data<string>
   *
   * @note This function is called by the controller `getCodeSent`
   */
  sendSMS(phone: string): Data<string> {
    try {
      const code = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      fetch('https://api.httpsms.com/v1/messages/send', {
        method: 'POST',
        headers: {
          'x-api-key': this.config.get<string>('VITE_SMS_KEY'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: '[ TRANSCENDENCE ]\n\nYour 2FA SMS code is: ' + code,
          from: '+351938552157',
          to: '+351' + phone,
        }),
      });
      return { data: code };
    } catch (e) {
      console.error(e);
    }
  }
}

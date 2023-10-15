import {
  Body,
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserEntity } from '../database/entities/user/user.service';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from '../database/transactions/user/user.interface';
import { RefreshService } from '../refresh/refresh.service';
import { RefreshEvents } from '../refresh/refresh.interface';
import myGateway from './gateway.decorator';

@Injectable()
@myGateway()
export class GatewayService implements OnModuleInit {
  constructor(
    private readonly userEntity: UserEntity,
    private readonly refreshService: RefreshService,
  ) {}

  @WebSocketServer()
  private readonly _server: Server;

  onModuleInit() {
    try {
      this._server.setMaxListeners(Infinity);
      this._server.engine.on('headers', (headers) => {
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'GET, POST';
        headers['Access-Control-Allow-Headers'] = 'Content-Type';
      });

      this._server.on('connection', (client) => {
        client.on('disconnect', () => {
          (async () => {
            const user = await this.userEntity.findOne({
              socket: client.id,
            });
            if (user) {
              await this.userEntity.update({
                where: { socket: client.id },
                data: { status: 'OFFLINE' as UserStatus },
              });
              this.refreshService.refresh({
                studentId: user.studentId,
                event: RefreshEvents.STATUS_CHANGE,
              });
            }
            client.removeAllListeners();
            client.disconnect();
          })();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}

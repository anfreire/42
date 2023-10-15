import { ConfigService } from '@nestjs/config';
import { WebSocketGateway } from '@nestjs/websockets';

export default function myGateway(): ClassDecorator {
  try {
    return (target: any) => {
      WebSocketGateway({
        cors: {
          origin: [new ConfigService().get<string>('VITE_BACKEND_URL')],
        },
      })(target);

      target.prototype.handleConnection = async function (
        client: any,
        ...args: any[]
      ) {
        client.setMaxListeners(Infinity);
      };
    };
  } catch (e) {
    console.error(e);
  }
}

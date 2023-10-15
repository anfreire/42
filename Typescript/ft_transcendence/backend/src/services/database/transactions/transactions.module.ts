import { Module, forwardRef } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { EntitiesModule } from '../entities/entities.module';
import { UserService } from './user/user.service';
import { ChatService } from './chat/chat.service';
import { ChannelService } from './channel/channel.service';
import { GameService } from './game/game.service';
import { UserController } from './user/user.controller';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [
    forwardRef(() => EntitiesModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => ServicesModule),
  ],

  providers: [UserService, ChatService, ChannelService, GameService],

  controllers: [UserController],

  exports: [UserService, ChannelService, ChatService, GameService],
})
export class TransactionsModule {}

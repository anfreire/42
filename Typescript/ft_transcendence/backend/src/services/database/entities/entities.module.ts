import { Module, forwardRef } from '@nestjs/common';
import { UserEntity } from './user/user.service';
import { ChatEntity } from './chat/chat.service';
import { ChannelEntity } from './channel/channel.service';
import { MessageEntity } from './message/message.service';
import { GameEntity } from './game/game.service';
import { DatabaseModule } from '../database.module';
import { AchievementsEntity } from './achievements/achievements.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],

  providers: [
    UserEntity,
    ChatEntity,
    ChannelEntity,
    MessageEntity,
    GameEntity,
    AchievementsEntity,
  ],

  exports: [
    UserEntity,
    ChatEntity,
    ChannelEntity,
    MessageEntity,
    GameEntity,
    AchievementsEntity,
  ],
})
export class EntitiesModule {}

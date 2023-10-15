import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { GatewayService } from './gateway/gateway.service';
import { RefreshService } from './refresh/refresh.service';
import { EntitiesModule } from './database/entities/entities.module';
import { TransactionsModule } from './database/transactions/transactions.module';
import { GameService } from './game/game.service';
import { AchievementsService } from './achievements/achievements.service';
@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => EntitiesModule),
    forwardRef(() => TransactionsModule),
  ],

  providers: [
    AuthService,
    GatewayService,
    RefreshService,
    GameService,
    AchievementsService,
  ],

  controllers: [AuthController],

  exports: [
    DatabaseModule,
    GatewayService,
    AuthService,
    RefreshService,
    GameService,
    AchievementsService,
  ],
})
export class ServicesModule {}

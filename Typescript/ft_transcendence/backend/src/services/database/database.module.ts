import { Module, forwardRef } from '@nestjs/common';
import { ServicesModule } from '../services.module';
import { InitService } from './init/init.service';
import { DatabaseService } from './database.service';
import { EntitiesModule } from './entities/entities.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    forwardRef(() => ServicesModule),
    forwardRef(() => EntitiesModule),
    forwardRef(() => TransactionsModule),
  ],

  providers: [DatabaseService, InitService],

  exports: [DatabaseService, InitService],
})
export class DatabaseModule {}

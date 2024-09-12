import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfigService } from '../services/database.config.service';

@Module({
     imports: [
          SequelizeModule.forRootAsync({
               imports: [ConfigModule],
               useClass: DatabaseConfigService,
          }),
     ],
})
export class DatabaseModule {}

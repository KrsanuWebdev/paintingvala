import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {
     constructor(private readonly _configService: ConfigService) {}

     createSequelizeOptions(): SequelizeModuleOptions {
          return {
               dialect: 'mysql',
               host: this._configService.get<string>('DBHOST') ,
               port: this._configService.get<number>('DBPORT'),
               username: this._configService.get<string>('DBUSER') ,
               password: this._configService.get<string>('DBPASSWORD') ,
               database: this._configService.get<string>('DBNAME') ,
               autoLoadModels: true,
               synchronize: true, 
               logging: console.log,
          };
     }
}

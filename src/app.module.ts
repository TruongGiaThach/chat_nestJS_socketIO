
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule, Module } from '@nestjs/common';
import {typeOrmConfig} from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import  Chat  from './chat/chat.entity';
import { AppGateway } from './app/app.gateway';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Chat])
    ],
    controllers: [AppController],
    providers: [AppService, AppGateway],

})
export class AppModule { }

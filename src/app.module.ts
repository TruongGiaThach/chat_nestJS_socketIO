import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    ChatsModule,
    AuthModule,
    MessagesModule,
  ],
})
export class AppModule {}

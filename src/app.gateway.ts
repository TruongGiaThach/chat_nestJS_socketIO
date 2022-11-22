import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';
import { CustomSocket } from './auth.adapter';
import { User } from './_schemas/user.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) { }

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    payload.sender_id = client.user._id;

    await this.messagesService.createMessage(payload);

    await this.server.in(payload.chat_id as string).emit('response_message', payload, client.user.email); // to all clients in room
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(client: CustomSocket, chatId: string) {
    client.join(chatId);
    client.broadcast.to(chatId)
      .emit('users-changed', { user: client.user.email, event: 'joined' }); // to all clients in the current namespace and chatId room except the sender
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(client: CustomSocket, chatId: string) {
    client.broadcast.to(chatId)
      .emit('users-changed', { user: client.user.email, event: 'left' });
    client.leave(chatId);
  }

  afterInit(server: Server) {
    this.logger.log(server);
    //Do stuffs
  }

  handleDisconnect(client: CustomSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('users-changed', { user: client.user.email, event: 'left' }); // basic emit
    //Do stuffs
  }

  async handleConnection(client: CustomSocket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('users-changed', { user: client.user.email, event: 'in' }); // basic emit

    //Do stuffs
  }
}

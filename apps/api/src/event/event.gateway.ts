import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinroom')
  async join(@MessageBody() data: any): Promise<any> {
    console.log("JOIN", data.id, data.username);
    this.server.emit('join', data);
    return data;
  }

  @SubscribeMessage('quitroom')
  async quit(@MessageBody() data: any): Promise<any> {
    console.log("QUIT", data.id, data.username);
    this.server.emit('quit', data);
    return data;
  }
}
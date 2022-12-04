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
    console.log("JOIN", data.id, data.playername);
    this.server.emit('join', data);
    return data;
  }

  @SubscribeMessage('playroom')
  async play(@MessageBody() data: any): Promise<any> {
    console.log("PLAY", data.roomId, data.name);
    this.server.emit('play', data);
    return data;
  }

  @SubscribeMessage('quitroom')
  async quit(@MessageBody() data: any): Promise<any> {
    console.log("QUIT", data.id, data.playername);
    this.server.emit('quit', data);
    return data;
  }
}
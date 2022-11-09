import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { RoomModule } from './room/room.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    HelloModule,
    RoomModule,
    PlayerModule
  ],
})

export class AppModule { }

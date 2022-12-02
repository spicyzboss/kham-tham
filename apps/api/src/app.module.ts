import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RoomModule,
    EventModule,
  ],
})

export class AppModule { }

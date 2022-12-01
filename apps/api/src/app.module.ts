import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { HelloModule } from './hello/hello.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HelloModule,
    RoomModule,
    UserModule,
    EventModule,
  ],
})

export class AppModule { }

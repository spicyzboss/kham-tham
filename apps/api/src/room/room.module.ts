import { Global, Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from "src/prisma/prisma.module";
import { UtilModule } from 'src/util/util.module';
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Global()
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UtilModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})

export class RoomModule { }

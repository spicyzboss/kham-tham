import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService],
})

export class RoomModule { }

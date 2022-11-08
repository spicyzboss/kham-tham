import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})

export class PlayerModule { }

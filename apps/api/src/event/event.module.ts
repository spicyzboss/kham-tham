import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { EventsGateway } from './event.gateway';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [EventsGateway],
})

export class EventModule { }

import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HelloController } from "./hello.controller";
import { HelloService } from "./hello.service";

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [HelloController],
  providers: [HelloService],
})

export class HelloModule { }

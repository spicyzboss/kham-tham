import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly appService: HelloService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/haha')
  getHaha(): string {
    return this.appService.getHaha();
  }

  @Get('/say/:message')
  getMessage(@Param('message') message: string): string {
    return this.appService.getMessage(message);
  }

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }
}

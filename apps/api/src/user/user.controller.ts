import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('player')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/user/:username')
  getPlayer(@Param('username') username: string): Promise<Pick<User, "email" | "username">> {
    return this.userService.getUserById(username);
  }
}

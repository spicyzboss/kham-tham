import { Body, Controller, Get, Param, Post, ConflictException, BadRequestException, Headers, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest, CreateUserResponse, LoginRequest, UserResponse } from 'types/user';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @Get('/me')
  async getUser(@Headers('Authorization') token: string): Promise<UserResponse> {
    if (!token) throw new UnauthorizedException();

    const decrytedData = this.jwtService.verify(token);

    const user: UserResponse = await this.userService.getUserById(decrytedData.id);
    return user;
  }

  @Get('/validate/username/:username')
  async validateUsername(@Param('username') username: string) {
    const isUser = await this.userService.validateUsername(username);

    if (isUser) throw new ConflictException();
    return null;
  }

  @Get('/validate/email/:email')
  async validateEmail(@Param('email') email: string) {
    const isUser = await this.userService.validateEmail(email);

    if (isUser) throw new ConflictException();
    return null;
  }

  @Post('/create')
  async createUser(@Body() user: CreateUserRequest) {
    const { email, password, username } = user;

    if (!email || !password || !username) throw new BadRequestException();

    const userData: CreateUserResponse = await this.userService.createUser(user);
    if (!userData) throw new InternalServerErrorException();

    const encryped: string = this.jwtService.sign(userData);

    return encryped;
  }

  @Post('/login')
  async login(@Body() cred: LoginRequest) {
    const { password, username } = cred;
    if (!password || !username) throw new BadRequestException();

    const userData = await this.userService.loginUser(cred);
    if (!userData) throw new NotFoundException();

    const encryped: string = this.jwtService.sign(userData);

    return encryped;
  }
}

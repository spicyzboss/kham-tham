import { BadRequestException, Body, ConsoleLogger, Controller, Delete, Get, Headers, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomRequest, CreateRoomResponse, CreateRoomWithQuestionRequest, GetPlayerResponse, JoinRoomByCodeResponse } from 'types/room';
import { JwtService } from '@nestjs/jwt';
import { Player, User } from '@prisma/client';
import { CreateUserResponse } from 'types/user';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly jwtService: JwtService,
  ) { }

  @Get('/me')
  async getPlayer(@Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();

    const player: Pick<Player, 'id'> = this.jwtService.verify(token);
    if (!player) throw new UnauthorizedException();
    const playerData: GetPlayerResponse = await this.roomService.getPlayer(player.id);
    if (!playerData) throw new BadRequestException();

    return playerData;
  }

  @Post('/create/player')
  async createPlayer(@Body('playername') playername: string) {
    if (!playername) throw new BadRequestException();

    const player = await this.roomService.createPlayer(playername);

    const encrypt = this.jwtService.sign(player);

    return encrypt;
  }

  @Post('/create')
  async createRoom(@Body() body: CreateRoomRequest, @Headers("Authorization") token: string) {
    if (!token) throw new UnauthorizedException();
    const { name, mode } = body;
    if (!name || !mode) throw new BadRequestException();

    const user: CreateUserResponse = this.jwtService.verify(token);
    if (!user) throw new UnauthorizedException();

    const room: CreateRoomResponse = await this.roomService.createRoom(name, mode, user.id);

    return room;
  }

  @Post('/join/:code')
  async joinRoomByCode(@Param('code') code: string, @Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();
    if (!code) throw new BadRequestException();

    const player: Pick<Player, 'id'> = this.jwtService.verify(token);
    if (!player) throw new UnauthorizedException();
    const playerData: GetPlayerResponse = await this.roomService.getPlayer(player.id);
    if (!playerData) throw new BadRequestException();

    const join: JoinRoomByCodeResponse = await this.roomService.joinRoomByCode(playerData.id, code);

    return join;
  }

  @Post('/quit/:code')
  async quitRoom(@Param('code') code: string, @Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();
    if (!code) throw new BadRequestException();

    const player: Pick<Player, 'id'> = this.jwtService.verify(token);
    if (!player) throw new UnauthorizedException();
    const playerData: GetPlayerResponse = await this.roomService.getPlayer(player.id);
    if (!playerData) throw new BadRequestException();

    const quit = await this.roomService.quitRoom(playerData.id, code);

    return quit;
  }

  @Get('/info/:id')
  async getRoom(@Param('id') id: string, @Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();
    if (!id) throw new BadRequestException();

    const room = await this.roomService.getRoom(parseInt(id));

    return room;
  }

  @Put('/:roomId/play')
  async playRoom(@Param('roomId') roomId: string, @Headers('Authorization') token: string) {
    console.log("roomId", roomId);
    if (!token) throw new UnauthorizedException();
    if (!roomId) throw new BadRequestException();


    const room = await this.roomService.playTheRoom(parseInt(roomId));

    console.log("room", room);

    return room;
  }

  @Get('/owner')
  async getOwnerRoom(@Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();

    const user: Pick<User, 'id'> = this.jwtService.verify(token);
    if (!user) throw new UnauthorizedException();

    const rooms = await this.roomService.getOwnerRoom(user.id);

    return rooms;
  }

  @Post('/create/withQuestion')
  async createRoomWithQuestion(@Body() body: CreateRoomWithQuestionRequest, @Headers("Authorization") token: string) {
    if (!token) throw new UnauthorizedException();
    const { name, mode, questions } = body;
    if (!name || !mode || !questions.length) throw new BadRequestException();

    const user: CreateUserResponse = this.jwtService.verify(token);
    if (!user) throw new UnauthorizedException();

    const room = this.roomService.createRoomQuestion(name, mode, user.id, questions);

    return room;
  }

  @Get('/:roomId/playerAnswerQuestion')
  async getPlayerAnswerQuestion(@Param('roomId') roomId: string, @Headers('Authorization') token: string) {
    if (!token) throw new UnauthorizedException();
    if (!roomId) throw new BadRequestException();

    const room = this.roomService.getPlayerAnswerQuestion(parseInt(roomId));

    return room;
  }

  @Post('/answer/:questionId')
  async playerAnswer(@Body() body: any, @Param('questionId') questionId: string) {
    const player = await this.roomService.playerAnswer(body.id, parseInt(questionId), body.type, body.answer);

    return player;
  }
}

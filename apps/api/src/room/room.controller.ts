import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomRequest, CreateRoomResponse, GetPlayerResponse, JoinRoomByCodeResponse } from 'types/room';
import { JwtService } from '@nestjs/jwt';
import { Player } from '@prisma/client';
import { CreateUserResponse, UserResponse } from 'types/user';

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
}

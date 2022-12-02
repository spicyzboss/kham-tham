import { Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '@prisma/client';

@Controller('room')
export class RoomController {
  constructor(private readonly appService: RoomService) { }

  @Post('/join/:code')
  getRoomByCode(@Param('code') code: string): Promise<Room | null> {
    return this.appService.getRoomByCode(code);
  }
}

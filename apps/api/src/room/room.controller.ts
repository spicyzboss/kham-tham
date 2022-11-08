import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '@prisma/client';

@Controller('room')
export class RoomController {
  constructor(private readonly appService: RoomService) { }


  @Get('')
  getHaha(): Promise<Room[] | null> {
    return this.appService.getRooms();
  }

  @Get(':code')
  getRoomByCode(@Param('code') code: string): Promise<Room | null> {
    return this.appService.getRoomByCode(code);
  }

  @Get('/test')
  getWave(): string {
    return "wave";
  }

}

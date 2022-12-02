import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) { }

  async joinRoomByCode(code: string): Promise<Room | null> {
    return await this.prisma.room.findFirst({
      where: {
        code: code
      }
    });
  }
}

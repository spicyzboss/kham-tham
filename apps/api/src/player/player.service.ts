import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) { }


  enterRoom(): number {
    return 1
  }


  async getUserFromId(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }
}

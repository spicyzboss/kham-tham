import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUserById(username: string): Promise<Pick<User, 'email' | 'username'>> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          username
        },
        select: {
          email: true,
          username: true,
        }
      });
    } catch (e) {
      console.log('UserService -> getUserById: Error', e.message);

      return null;
    }
  }
}

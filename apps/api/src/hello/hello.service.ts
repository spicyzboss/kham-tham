import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HelloService {
  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getHaha(): string {
    return 'Haha';
  }

  getMessage(message: string): string {
    return `Hello, ${message}`;
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserFromId(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }
}

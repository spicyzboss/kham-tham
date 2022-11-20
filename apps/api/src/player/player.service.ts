import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) { }


}

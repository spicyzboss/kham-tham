import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly appService: PlayerService) { }

}

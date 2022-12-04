import { Injectable } from '@nestjs/common';
import { GameMode, Player, Room } from '@prisma/client';
import { GetPlayerResponse, JoinRoomByCodeResponse } from 'types/room';
import { PrismaService } from '../prisma/prisma.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private util: UtilService,
  ) { }

  async createRoom(name: string, mode: GameMode, ownerId: string) {
    try {
      const code = this.util.genCode();

      const room = await this.prisma.room.create({
        data: {
          mode,
          name,
          code,
          owner: {
            connect: {
              id: ownerId,
            }
          },
          status: "WAITING",
        },
        select: {
          code: true,
          name: true,
          mode: true,
        }
      });

      return room;
    } catch (e) {
      return null;
    }
  }

  async createPlayer(playername: string) {
    try {
      const player: Pick<Player, 'id'> = await this.prisma.player.create({
        data: {
          playername,
        },
        select: {
          id: true,
        }
      });

      return player;
    } catch (e) {
      return null;
    }
  }

  async getPlayer(playerId: string) {
    try {
      const player: GetPlayerResponse = await this.prisma.player.findUnique({
        where: {
          id: playerId,
        },
        select: {
          id: true,
          playername: true,
        }
      });

      return player;
    } catch (e) {
      return null;
    }
  }

  async joinRoomByCode(playerId: string, code: string) {
    try {
      const room: Pick<Room, 'id'> = await this.prisma.room.findFirst({
        where: {
          code,
        },
        select: {
          id: true,
        }
      });

      const playerJoinedRoom: JoinRoomByCodeResponse = await this.prisma.playerJoinedRoom.create({
        data: {
          player: {
            connect: {
              id: playerId,
            }
          },
          room: {
            connect: {
              id: room.id,
            }
          }
        },
        select: {
          id: true,
          playerId: true,
          roomId: true,
        }
      });

      return playerJoinedRoom;
    } catch (e) {
      return null;
    }
  }

  async quitRoom(playerId: string, code: string) {
    try {
      const playerJoined = await this.prisma.playerJoinedRoom.findFirst({
        where: {
          playerId,
          room: {
            code,
            status: "WAITING",
          }
        },
        select: {
          id: true,
        }
      });

      const player = await this.prisma.playerJoinedRoom.delete({
        where: {
          id: playerJoined.id,
        },
        select: {
          playerId: true,
          roomId: true,
        }
      });

      return player;
    } catch (e) {
      return null;
    }
  }

  async getRoom(roomId: number) {
    try {
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
          RoomQuestion: true,
          PlayerJoinedRoom: {
            select: {
              player: true,
            }
          },
          owner: {
            select: {
              username: true,
            }
          },
        }
      });

      return room;
    } catch (e) {
      return null;
    }
  }

  async getOwnerRoom(ownerId: string) {
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          ownerId,
        },
        select: {
          id: true,
          code: true,
          name: true,
          mode: true,
          status: true,
          RoomQuestion: true,
          createdAt: true,
        }
      });

      return rooms;
    } catch (e) {
      return null;
    }
  }

  async createRoomQuestion(name: string, mode: GameMode, ownerId: string, questions: any[]) {
    try {
      const code = this.util.genCode();

      const questionMap = (q) => {
        let con;

        if (q.type === "QUIZ_4_ANSWER") {
          con = {
            Question4Question: {
              create: {
                question: q.question,
                choice1: q.choice1,
                choice2: q.choice2,
                choice3: q.choice3,
                choice4: q.choice4,
                answer: q.answer,
                score: q.score,
                timeDisplayQuestion: q.timeDisplayQuestion,
                timeAnswerQuestion: q.timeAnswerQuestion,
              }
            }
          };
        } else if (q.type === "MULTI_SELECT_ANSWER") {
          con = {
            MultiSelectQuestion: {
              create: {
                question: q.question,
                choice1: q.choice1,
                choice2: q.choice2,
                choice3: q.choice3,
                choice4: q.choice4,
                answer: q.answer,
                score: q.score,
                timeDisplayQuestion: q.timeDisplayQuestion,
                timeAnswerQuestion: q.timeAnswerQuestion,
              }
            }
          };
        } else if (q.type === "TYPE_ANSWER") {
          con = {
            TypeQuestion: {
              create: {
                question: q.question,
                answer: q.answer,
                score: q.score,
                timeAnswerQuestion: q.timeAnswerQuestion,
                timeDisplayQuestion: q.timeDisplayQuestion,
              }
            }
          };
        } else {
          con = {};
        }

        return {
          type: q.type,
          ...con,
        };
      };

      const qm = questions.map(v => questionMap(v));

      const room = await this.prisma.room.create({
        data: {
          mode,
          name,
          code,
          owner: {
            connect: {
              id: ownerId,
            }
          },
          status: "WAITING",
          RoomQuestion: {
            create: qm,
          }
        },
        select: {
          code: true,
          name: true,
          mode: true,
          RoomQuestion: {
            select: {
              id: true,
              roomId: true,
              type: true,
              createdAt: true,
              Question4Question: true,
              MultiSelectQuestion: true,
              TypeQuestion: true,
            }
          },
        }
      });

      return room;
    } catch (e) {
      return null;
    }
  }
}

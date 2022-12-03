import { Player, PlayerJoinedRoom, Prisma, Room } from '@prisma/client';

type JoinRoomByCodeResponse = Pick<PlayerJoinedRoom, 'playerId' | 'roomId' | 'id'>;

type GetPlayerResponse = Pick<Player, 'id' | 'playername'>;

type CreateRoomRequest = Pick<Prisma.RoomCreateInput, 'name' | 'mode'>;
type CreateRoomResponse = Pick<Room, 'code' | 'mode' | 'name'>;

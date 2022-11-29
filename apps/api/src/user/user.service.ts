import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { CreateUserResponse, CreateUserRequest, UserResponse, LoginRequest } from 'types/user';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUserById(id: string): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        },
        select: {
          email: true,
          username: true,
          id: true,
        }
      });

      return user;
    } catch (e) {
      return null;
    }
  }

  async validateUsername(username: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username
        },
      });

      return user;
    } catch (e) {
      return null;
    }
  }

  async validateEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email
        },
      });

      return user;
    } catch (e) {
      return null;
    }
  }

  async createUser(userArgs: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, username } = userArgs;

    try {
      const hashedPassword = await hash(password, 12);

      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
        }
      });

      return user;
    } catch (e) {
      return null;
    }
  }

  async loginUser(cred: LoginRequest) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: cred.username,
          // password: hashedPassword,
        },
        select: {
          id: true,
          password: true,
        }
      });

      console.log(user.password);
      console.log(cred.password);

      const isSame = await compare(cred.password, user.password);
      console.log(isSame);

      if (isSame) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

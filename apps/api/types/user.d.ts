import { User } from '@prisma/client';

type CreateUserRequest = Pick<Prisma.UserCreateInput, 'email' | 'username' | 'password'>;
type CreateUserResponse = Pick<User, 'id'>;

type UserResponse = Pick<User, 'email' | 'username' | 'id'>;

type LoginRequest = Pick<User, 'username' | 'password'>;

import { Axios } from 'axios';
import { User } from '@prisma/client';

type CreateUserRequest = Pick<User, 'username' | 'email' | 'password'>;
type LoginCredentials = Pick<User, 'username' | 'password'>;

class KhamThamAPI extends Axios {
  constructor() {
    super({
      baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  async createUser(userInput: CreateUserRequest) {
    const request = await this.post('/user/create', JSON.stringify({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    }));

    return request;
  }

  async login(loginCred: LoginCredentials) {
    const request = await this.post('/user/login', JSON.stringify({
      username: loginCred.username,
      password: loginCred.password,
    }));

    return request;
  }
}

export default new KhamThamAPI();

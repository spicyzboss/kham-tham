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

  async getPlayer(token: string) {
    const request = await this.get('/room/me', {
      headers: {
        'Authorization': token,
      },
    });

    return request;
  }

  async createPlayer(playername: string) {
    const request = await this.post('/room/create/player', JSON.stringify({
      playername,
    }));

    return request;
  }

  async joinRoom(code: string, token: string) {
    const request = await this.post(`/room/join/${code}`, JSON.stringify({}), {
      headers: {
        'Authorization': token,
      },
    });

    return request;
  }
}

export default new KhamThamAPI();

// import { Axios } from 'axios';
import { User } from '@prisma/client';

type CreateUserRequest = Pick<User, 'username' | 'email' | 'password'>;
type LoginCredentials = Pick<User, 'username' | 'password'>;

class KhamThamAPI {
  constructor() {
  }

  async createUser(userInput: CreateUserRequest) {
    const request = await this.post('/user/create', JSON.stringify({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    }));

    return request;
  }
}

export default new KhamThamAPI();

import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

@Injectable()
export class UtilService {
  ALPHABET: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor() { }

  genCode(): string {
    const code = customAlphabet(this.ALPHABET, 6);
    return code();
  }
}

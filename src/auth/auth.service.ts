import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'src/constants';

@Injectable()
export class AuthService {
  generateJWT(userId: number) {
    return jwt.sign(
      {
        userId,
        'https://hasura.io/jwt/claims': {
          'x-hasura-default-role': 'user',
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-role': 'user',
          'x-hasura-user-id': `${userId}`,
        },
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
  }

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}

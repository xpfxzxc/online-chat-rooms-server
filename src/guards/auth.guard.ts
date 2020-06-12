import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    const prefix = 'Bearer ';

    const authorization = req.get('authorization');
    if (!authorization || !authorization.startsWith(prefix)) {
      throw new UnauthorizedException('token expired');
    }

    const token = authorization.slice(prefix.length);

    return new Promise(resolve => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('token expired');
        }
        req['__userId'] = decoded['userId'];
        resolve(true);
      });
    });
  }
}

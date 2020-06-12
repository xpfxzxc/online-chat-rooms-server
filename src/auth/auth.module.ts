import { Module, Global } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Global()
@Module({
  exports: [AuthService],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}

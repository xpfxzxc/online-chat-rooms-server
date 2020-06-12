import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserEntity } from 'src/generated/user-entity';

@Global()
@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
})
export class UserModule {}

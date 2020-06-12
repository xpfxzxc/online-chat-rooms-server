import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/generated/user-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async getUserById(id: number | string): Promise<UserEntity> {
    return await this.repo.findOne(id);
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ name });
    return user || null;
  }

  async insertUser(obj: Partial<UserEntity>): Promise<UserEntity> {
    return this.repo.save(this.repo.create(obj));
  }

  async updatePassword(
    id: number | string,
    encryptedPassword: string,
  ): Promise<void> {
    id = +id;

    await this.repo.update(id, { password: encryptedPassword });
  }
}

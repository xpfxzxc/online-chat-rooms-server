import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const JWT_SECRET = 'q9j-Ct8iQD-Z8yuZRbAy6LulFo07VTKiRQntuSWWfRc';
export const ORM_CONFIG: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'online-chat-rooms',
  schema: 'public',
  synchronize: false,
};

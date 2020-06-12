import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { ORM_CONFIG } from './constants';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './src/my-schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      ...ORM_CONFIG,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, AuthGuard],
})
export class AppModule {}

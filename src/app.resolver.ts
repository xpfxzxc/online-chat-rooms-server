import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  hello() {
    return 'hello';
  }
}

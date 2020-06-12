import { Field, Int, ObjectType } from 'type-graphql';

import { TimestamptzScalar } from 'src/scalars/timestamptz.scalar';

@ObjectType('logged_user')
export class LoggedUser {
  @Field(() => Int)
  id?: number;

  @Field()
  name?: string;

  @Field(() => TimestamptzScalar)
  created_at?: string;
}

import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType('sign_up_response')
export class SignUpResponse {
  @Field(type => Int)
  id: number;
}

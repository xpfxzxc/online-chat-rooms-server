import { Field, ObjectType } from 'type-graphql';

@ObjectType('change_password_response')
export class ChangePasswordResponse {
  @Field()
  success: boolean;
}

import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType('change_password_input')
export class ChangePasswordInput {
  @Field()
  @Length(6)
  new_password: string;
}

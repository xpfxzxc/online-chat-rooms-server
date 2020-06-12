import { MinLength, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType('sign_up_input')
export class SignUpInput {
  @Field()
  @Length(2, 25)
  name: string;

  @Field()
  @MinLength(6)
  password: string;
}

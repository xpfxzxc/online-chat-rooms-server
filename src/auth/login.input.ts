import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType('login_input')
export class LoginInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

import {
  ConflictException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { SignUpInput } from './sign-up.input';
import { SignUpResponse } from './sign-up.response';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';
import { LoginResponse } from './login.response';
import { ChangePasswordInput } from './change-password.input';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { ChangePasswordResponse } from './change-password.response';
import { LoggedUser } from 'src/types/user-basic.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => SignUpResponse, { name: 'sign_up' })
  async signUp(
    @Args('input') { name, password }: SignUpInput,
  ): Promise<SignUpResponse> {
    if (await this.userService.getUserByName(name)) {
      throw new ConflictException('昵称已被注册');
    }

    const encryptedPassword = await this.authService.encryptPassword(password);

    const user = await this.userService.insertUser({
      name,
      password: encryptedPassword,
    });

    return user;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') { name, password }: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.userService.getUserByName(name);

    if (
      !user ||
      !(await this.authService.verifyPassword(password, user.password))
    ) {
      throw new UnauthorizedException('昵称或密码错误');
    }

    const token = this.authService.generateJWT(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        created_at: user.created_at as any,
      },
      token,
    };
  }

  @Mutation(() => ChangePasswordResponse, { name: 'change_password' })
  @UseGuards(AuthGuard)
  async changePassword(
    @UserId() id: number,
    @Args('input') { new_password }: ChangePasswordInput,
  ): Promise<ChangePasswordResponse> {
    const encryptedPassword = await this.authService.encryptPassword(
      new_password,
    );

    await this.userService.updatePassword(id, encryptedPassword);

    return { success: true };
  }

  @Query(() => LoggedUser, { name: 'logged_user' })
  @UseGuards(AuthGuard)
  async getLoggedUser(@UserId() userId: number): Promise<LoggedUser> {
    const user = await this.userService.getUserById(userId);

    return {
      id: user.id,
      name: user.name,
      created_at: user.created_at as any,
    };
  }
}

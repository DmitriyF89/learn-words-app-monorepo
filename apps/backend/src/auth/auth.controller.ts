import { Controller, Post, Body, Session, Get, Request } from '@nestjs/common';

import { UserAuthDto, UserRegisterDto } from '@backend/auth-dtos'
import { UserDto } from '@backend/user-dtos';

import { AuthService } from './auth.service';
import { WithSerialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
@WithSerialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signin')
  async signin(@Body() body: UserAuthDto, @Session() session: Record<string, any>) {
    const user = await this.authService.signin(body);
    session.userId = user.id;

    return user;
  }

  @Post('signup')
  async signup(@Body() body: UserRegisterDto, @Session() session: Record<string, any>) {
    const user = await this.authService.signup(body);
    session.userId = user.id;

    return user;
  }

  @Get('signout')
  signout(@Session() session: Record<string, any>, @Request() req: Record<string, any>) {
    session.userId = undefined;
    req.currentUser = undefined;

    return true;
  }
}

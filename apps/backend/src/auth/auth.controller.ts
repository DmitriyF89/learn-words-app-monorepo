import { Controller, Post, Body } from '@nestjs/common';

import { UserAuthDto } from '@backend/auth-dtos'
import { UserDto } from '@backend/user-dtos';

import { AuthService } from './auth.service';
import { WithSerialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
@WithSerialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signin')
  signin(@Body() body: UserAuthDto) {
    return this.authService.signin(body);
  }

  @Post('signup')
  signup(@Body() body: UserAuthDto) {
    return this.authService.signup(body);
  }
}

import { Controller, Post, Body } from '@nestjs/common';

import { UserAuthDto } from '@backend/auth-dtos'
import { AuthService } from './auth.service';

@Controller('auth')
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

import { Controller, Get, Post, Body } from "@nestjs/common";
import { User } from "@backend/entities";

import { UsersService } from "./users.service";
import { CurrentUser } from "../decorators/current-user.decorator";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('current')
  getUserById(@CurrentUser() user: User) {
    return user;
  }

  @Post('current')
  updateCurrentUser(@CurrentUser() user: User, @Body() body: any) {
    // TODO: add logic to update user...
    this.userService.updateUser();
  }
}
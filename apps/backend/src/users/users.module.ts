import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { User } from '@backend/entities';

import { UsersService } from './users.service';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }],
  controllers: [UsersController]
})
export class UsersModule { }

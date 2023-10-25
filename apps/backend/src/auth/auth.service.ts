import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { UserAuthDto, UserRegisterDto } from '@backend/auth-dtos';

import { UsersService } from '../users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  private async encryptPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32) as Buffer);

    return `${salt}.${hash.toString('hex')}`;
  }

  private async validatePassword(receivedPassword: string, hashedPassword: string) {
    const [salt, password] = hashedPassword.split('.');

    const candidate = (await scrypt(receivedPassword, salt, 32) as Buffer).toString('hex');

    if (candidate !== password) {
      throw new BadRequestException('Wrong password');
    }
  }

  async signin({ email, password }: UserAuthDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.validatePassword(password, user.password);

    return user;
  }

  async signup({ email, password, confirmPassword }: UserRegisterDto) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Password and confirmPassword do not match');
    }

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email is occupied');
    }

    const encryptedPassword = await this.encryptPassword(password);

    return this.usersService.createUser({ email, password: encryptedPassword });
  }
}

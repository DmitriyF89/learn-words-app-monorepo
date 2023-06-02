import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAuthDto } from '@backend/auth-dtos';
import { User } from '@backend/entities';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByEmail(email: string) {
    const user = this.repo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findById(id: string) {
    const user = this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(user: UserAuthDto) {
    const userEntity = this.repo.create(user);

    return this.repo.save(userEntity);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUser() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteUser() {}
}

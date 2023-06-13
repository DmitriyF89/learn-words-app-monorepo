import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) { }

  async intercept(ctx: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = ctx.switchToHttp().getRequest();
    const { userId } = req?.session ?? {};

    if (userId) {
      const user = this.usersService.findById(userId);
      req.currentUser = user;
    } else {
      req.currentUser = undefined;
    }

    return next.handle();
  }
}

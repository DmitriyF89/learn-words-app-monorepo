import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_: never, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.currentUser;
});
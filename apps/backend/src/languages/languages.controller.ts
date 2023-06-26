import { Controller, Get, Post, Delete, Session, UseGuards, Param } from '@nestjs/common';

import { LanguagesService } from './languages.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) { }

  @Get()
  @UseGuards(AuthGuard)
  getUserLanguages(@Session() session: Record<string, string>) {
    return this.languagesService.getLanguagesByUserId(session.userId);
  }

  @Post(':languageName')
  @UseGuards(AuthGuard)
  createLanguage(
    @Param('languageName') languageName: string,
    @Session() session: Record<string, string>) {
    return this.languagesService.createLanguage({ languageName, userId: session.userId })
  }

  @Delete(':languageId')
  @UseGuards(AuthGuard)
  deleteLanguage(
    @Param('languageId') languageId: string,
    @Session() session: Record<string, string>
  ) {
    return this.languagesService.deleteLanguage({ languageId, userId: session.userId });
  }
}

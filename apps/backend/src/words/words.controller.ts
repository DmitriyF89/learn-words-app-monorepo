import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { AddWordDto } from '@backend/word-dtos';

import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) { }

  @Post('add-word/:languageId')
  addWord(
    @Body() body: AddWordDto,
    @Param('languageId') languageId: string
  ) {
    return this.wordsService.addWord(body, languageId);
  }

  @Get(':languageId')
  getAllWords(@Param('languageId') languageId: string) {
    return this.wordsService.getLanguageWords(languageId);
  }

  @Get(':languageId/repeat')
  getWordsToRepeat(@Param('languageId') languageId: string) {
    return this.wordsService.getWordsToRepeat(languageId);
  }
}

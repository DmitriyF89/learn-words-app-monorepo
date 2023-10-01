import { Body, Controller, Param, Post, Get, Delete, Put, Session } from '@nestjs/common';

import { AddWordDto, UpdateWordDto } from '@backend/word-dtos';

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

  @Get(':languageId/:wordId')
  getWord(
    @Param('languageId') languageId: string,
    @Param('wordId') wordId: string,
    @Session() session: Record<string, string>
  ) {
    return this.wordsService.getWord({ languageId, wordId, userId: session.userId })
  }

  @Delete(':languageId/:wordId')
  deleteWord(
    @Param('languageId') languageId: string,
    @Param('wordId') wordId: string,
    @Session() session: Record<string, string>
  ) {
    return this.wordsService.deleteWord({ languageId, userId: session.userId, wordId })
  }

  @Put(':languageId/:wordId')
  updateWord(@Param('wordId') wordId: string, @Body() body: UpdateWordDto) {
    return this.wordsService.updateWord(wordId, body);
  }
}

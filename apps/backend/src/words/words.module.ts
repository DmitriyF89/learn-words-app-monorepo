import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { DateService } from '../utils/Date';

@Module({
  providers: [WordsService, DateService],
  controllers: [WordsController]
})
export class WordsModule { }

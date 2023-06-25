import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Word } from '@backend/entities';

import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { DateService } from '../utils/Date';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  providers: [WordsService, DateService],
  controllers: [WordsController]
})
export class WordsModule { }

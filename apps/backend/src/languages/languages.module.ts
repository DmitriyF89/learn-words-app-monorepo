import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Language } from '@backend/entities';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule { }

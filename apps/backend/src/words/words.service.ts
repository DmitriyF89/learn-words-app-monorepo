import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Word } from '@backend/entities';
import { AddWordDto, UpdateWordDto } from '@backend/word-dtos';

import { DateService } from '../utils/Date';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private repo: Repository<Word>,
    private dateService: DateService
  ) { }

  getLanguageWords(langId: string) {
    return this.repo.find({ where: { language: { id: langId } } });
  }

  addWord(
    { text, examples, picture, synonyms }: AddWordDto,
    languageId: string) {
    const word = this.repo.create({
      text,
      language: {
        id: languageId,
      },
      examples,
      picture,
      synonyms,
      added: this.dateService.getCurrentDateString(),
      successWordRecallCount: 0,
      lastRecall: '',
    });

    return this.repo.save(word);
  }

  async getWordsToRepeat(languageId: string) {
    // Grab the words
    const words = await this.repo.find(
      {
        where:
        {
          language: { id: languageId },
          successWordRecallCount: LessThan(6)
        }
      }
    );

    // Filter only those that has to be repeated this day
    const successRecallCountToNextDayDistance = {
      0: 1,
      1: 3,
      2: 7,
      3: 14,
      4: 30,
      5: 60,
    }

    // TODO: move nextDateShift to some constants or other file
    const today = this.dateService.getCurrentDateString()

    return words.filter(({ lastRecall, successWordRecallCount }) => {
      const isWordHasNotBeenTrainedYet = !lastRecall;
      const isWordLearned = successWordRecallCount > 5;

      if (isWordHasNotBeenTrainedYet) {
        return true;
      }

      if (isWordLearned) {
        return false;
      }

      const dateToRepeat = this.dateService.getNextDateString(lastRecall, successRecallCountToNextDayDistance[successWordRecallCount]);

      return this.dateService.isFirstDateEqualsOrBefore(dateToRepeat, today);
    });
  }

  async deleteWord({ wordId, languageId, userId }: { languageId: string, userId: string, wordId: string }) {
    const word = await this.repo.findOne({ where: { id: wordId, language: { id: languageId, user: { id: userId } } } });

    if (!word) {
      throw new BadRequestException('No such a word');
    }

    return this.repo.remove(word);
  }

  async updateWord(wordId: string, updatedWord: UpdateWordDto) {
    const word = await this.repo.findOne({ where: { id: wordId } });

    if (!word) {
      throw new NotFoundException(`No word with id ${wordId}`);
    }

    return this.repo.update(word, updatedWord);
  }
}
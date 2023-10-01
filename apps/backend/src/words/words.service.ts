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

  private delimiter = '|';

  private joinWithDelimiter = (arr: string[]) => {
    return arr.join(this.delimiter);
  };

  getLanguageWords(langId: string) {
    return this.repo.find({ where: { language: { id: langId } } });
  }

  addWord(
    { text, examples, picture, synonyms, description }: AddWordDto,
    languageId: string) {
    const word = this.repo.create({
      text,
      description,
      language: {
        id: languageId,
      },
      examples: this.joinWithDelimiter(examples),
      picture,
      synonyms: synonyms.join(this.delimiter),
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
        },
        order: {
          id: 'ASC'
        }
      }
    );

    // Filter only those that has to be repeated this day
    const successRecallCountToNextDayDistance = {
      0: 0,
      1: 1,
      2: 3,
      3: 7,
      4: 14,
      5: 30,
      6: 60,
    }

    // TODO: move nextDateShift to some constants or other file
    const today = this.dateService.getCurrentDateString()

    return words.filter(({ lastRecall, successWordRecallCount }) => {
      const isWordHasNotBeenTrainedYet = !lastRecall;
      const isWordLearned = successWordRecallCount > 6;

      if (isWordHasNotBeenTrainedYet) {
        return true;
      }

      if (isWordLearned) {
        return false;
      }

      if (new Date(today).toDateString() === new Date(lastRecall).toDateString()) {
        return true;
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

    const newSynonyms = updatedWord.synonyms ? this.joinWithDelimiter(updatedWord.synonyms) : word.synonyms;
    const newExamples = updatedWord.examples ? this.joinWithDelimiter(updatedWord.examples) : word.examples;

    const newWord = {
      ...word, ...updatedWord, synonyms: newSynonyms,
      examples: newExamples,
    }

    return this.repo.save(newWord);
  }

  async getWord({ wordId, languageId, userId }: { languageId: string, userId: string, wordId: string }) {
    const word = await this.repo.findOne({ where: { id: wordId, language: { id: languageId, user: { id: userId } } } });

    if (!word) {
      throw new NotFoundException(`No word with id ${wordId}`);
    }

    return word;
  }
}

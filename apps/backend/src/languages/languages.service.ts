import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Language } from '@backend/entities';

@Injectable()
export class LanguagesService {
  constructor(@InjectRepository(Language) private repo: Repository<Language>) { }

  getLanguagesByUserId(userId: string) {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async getLanguageById({ languageId, userId }: { userId: string, languageId: string }) {
    const language = await this.repo.find({ where: { id: languageId, user: { id: userId } } });

    if (!language) {
      throw new NotFoundException(`No language with id ${languageId}`);
    }

    return language;
  }

  async createLanguage({ languageName, userId }: { userId: string, languageName: string }) {
    const normalizedLanguageName = languageName.toLowerCase();

    const language = await this.repo.findOne({ where: { name: normalizedLanguageName, user: { id: userId } } });

    if (language) {
      throw new BadRequestException('Such language already exists');
    }

    const newLanguage = this.repo.create({
      name: normalizedLanguageName,
      user: {
        id: userId
      }
    });

    return this.repo.save(newLanguage);
  }

  async deleteLanguage({ languageId, userId }: { userId: string, languageId: string }) {
    const language = await this.repo.findOne({ where: { id: languageId, user: { id: userId } } });

    if (!language) {
      throw new NotFoundException(`No language with id ${languageId}`);
    }

    return this.repo.remove(language);
  }
}

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string;

  @Column()
  synonyms?: string

  @Column()
  examples?: string

  @Column()
  picture?: string

  @Column()
  added: string

  @Column()
  lastCorrectRecall: string

  @Column()
  successWordRecallCount: number

  @ManyToOne(() => Language, (language) => language.words)
  language: Language
}
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  synonyms: string

  @Column({ nullable: true })
  examples: string

  @Column({ nullable: true })
  picture: string

  @Column()
  added: string

  @Column()
  lastRecall: string

  @Column()
  successWordRecallCount: number

  @ManyToOne(() => Language, (language) => language.words)
  language: Language
}
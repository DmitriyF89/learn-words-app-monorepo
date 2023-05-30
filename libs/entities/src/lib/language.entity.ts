import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { Word } from './word.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @OneToMany(() => Word, (word) => word.language)
  words: Word[];

  @ManyToOne(() => User, (user) => user.languages)
  user: User;
}
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => Language, (language) => language.user)
  languages: Language[]
}
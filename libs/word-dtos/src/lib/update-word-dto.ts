import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateWordDto {
  @IsString()
  text?: string;

  @IsString()
  synonyms?: string

  @IsString()
  examples?: string

  @IsString()
  picture?: string

  @Column()
  lastRecall?: string

  @Column()
  successWordRecallCount?: number
}
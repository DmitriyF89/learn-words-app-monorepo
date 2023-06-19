import { IsString } from 'class-validator';

export class AddWordDto {
  @IsString()
  text: string;

  @IsString()
  synonyms?: string

  @IsString()
  examples?: string

  @IsString()
  picture?: string
}
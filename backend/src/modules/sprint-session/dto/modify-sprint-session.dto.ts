import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ModifySprintSessionDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image?: string;

  @IsDateString()
  dueDate: string;

  @IsDateString()
  startDate: string;
}

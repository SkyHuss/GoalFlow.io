import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ModifySprintSessionDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

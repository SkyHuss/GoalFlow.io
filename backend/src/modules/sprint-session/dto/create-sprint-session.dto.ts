import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSprintSessionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  picture?: string;

  @IsDateString()
  dueDate: string;

  @IsDateString()
  startDate: string;
}

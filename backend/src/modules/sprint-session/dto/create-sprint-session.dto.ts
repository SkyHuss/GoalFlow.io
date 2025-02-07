import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({
  name: 'CreateSprintSessionDto',
})
export class CreateSprintSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsDateString()
  dueDate: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;
}

import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  isDone: boolean;
}

import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateExampleDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  updatedBy?: number;
}

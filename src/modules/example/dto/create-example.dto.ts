import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateExampleDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  createdBy?: number;

  @IsNotEmpty()
  updatedBy?: number;
}

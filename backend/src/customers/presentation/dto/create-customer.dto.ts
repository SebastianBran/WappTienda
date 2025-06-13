import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsString()
  @IsOptional()
  notes: string;
}

import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsDate()
  @IsNotEmpty()
  birthDate?: Date;

  @IsString()
  @IsNotEmpty()
  notes?: string;
}

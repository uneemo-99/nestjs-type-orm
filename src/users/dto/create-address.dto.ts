import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsNumber()
  zip_code: number;
}

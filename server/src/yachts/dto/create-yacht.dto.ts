import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { RentalType, VesselType } from '../yacht.entity';

const VESSEL_TYPES: VesselType[] = [
  'Катамаран',
  'Гулет',
  'Катер',
  'Моторная яхта',
  'Моторный катамаран',
  'Парусная яхта',
];

const RENTAL_TYPES: RentalType[] = ['Без капитана', 'С капитаном'];

export class CreateYachtDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  country: string;

  @IsIn(VESSEL_TYPES)
  type: VesselType;

  @IsInt()
  @Min(100)
  @Max(1000000)
  price: number;

  @IsInt()
  @Min(4)
  @Max(80)
  length: number;

  @IsInt()
  @Min(1)
  @Max(30)
  berths: number;

  @IsInt()
  @Min(1)
  @Max(15)
  toilets: number;

  @IsInt()
  @Min(1980)
  @Max(2030)
  year: number;

  @IsIn(RENTAL_TYPES)
  rentalType: RentalType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  image: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string;
}

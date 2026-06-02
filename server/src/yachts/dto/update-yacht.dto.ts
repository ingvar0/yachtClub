import {
  IsIn,
  IsInt,
  IsOptional,
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

export class UpdateYachtDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsOptional()
  @IsIn(VESSEL_TYPES)
  type?: VesselType;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(1000000)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(4)
  @Max(80)
  length?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  berths?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  toilets?: number;

  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(2030)
  year?: number;

  @IsOptional()
  @IsIn(RENTAL_TYPES)
  rentalType?: RentalType;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

export type VesselType =
  | 'Катамаран'
  | 'Гулет'
  | 'Катер'
  | 'Моторная яхта'
  | 'Моторный катамаран'
  | 'Парусная яхта';

export type RentalType = 'Без капитана' | 'С капитаном';

export class Yacht {
  id: number;
  name: string;
  country: string;
  type: VesselType;
  price: number;
  length: number;
  berths: number;
  toilets: number;
  year: number;
  rentalType: RentalType;
  image: string;
  description: string;
  createdById?: number;

  constructor(partial: Partial<Yacht>) {
    Object.assign(this, partial);
  }
}

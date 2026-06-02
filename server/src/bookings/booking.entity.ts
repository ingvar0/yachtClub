export type BookingStatus = 'pending' | 'approved' | 'rejected';

export class Booking {
  id: number;
  yachtId: number;
  yachtName: string;
  clientId: number;
  clientName: string;
  clientEmail: string;
  ownerId: number;
  date: string;
  status: BookingStatus;

  constructor(partial: Partial<Booking>) {
    Object.assign(this, partial);
  }
}

import { IsIn } from 'class-validator';
import { BookingStatus } from '../booking.entity';

export class UpdateBookingStatusDto {
  @IsIn(['approved', 'rejected'], {
    message: 'Статус: approved (согласовать) или rejected (отклонить)',
  })
  status: Extract<BookingStatus, 'approved' | 'rejected'>;
}

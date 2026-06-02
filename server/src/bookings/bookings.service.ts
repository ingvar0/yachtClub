import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { YachtsService } from '../yachts/yachts.service';
import { UsersService } from '../users/users.service';
import { Booking, BookingStatus } from './booking.entity';

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];
  private nextId = 1;

  constructor(
    private readonly yachtsService: YachtsService,
    private readonly usersService: UsersService,
  ) {}

  findByClient(clientId: number): Booking[] {
    return this.bookings
      .filter((b) => b.clientId === clientId)
      .sort((a, b) => b.id - a.id);
  }

  findByOwner(ownerId: number): Booking[] {
    return this.bookings
      .filter((b) => b.ownerId === ownerId)
      .sort((a, b) => b.id - a.id);
  }

  findOne(id: number): Booking {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) {
      throw new NotFoundException(`Заявка #${id} не найдена`);
    }
    return booking;
  }

  create(clientId: number, yachtId: number): Booking {
    const yacht = this.yachtsService.findOne(yachtId);
    const ownerId = yacht.createdById;
    if (!ownerId) {
      throw new BadRequestException('У объявления не указан владелец');
    }

    const client = this.usersService.findOne(clientId);
    if (client.role !== 'client') {
      throw new ForbiddenException('Бронировать могут только клиенты');
    }

    const duplicate = this.bookings.find(
      (b) =>
        b.yachtId === yachtId &&
        b.clientId === clientId &&
        b.status === 'pending',
    );
    if (duplicate) {
      throw new BadRequestException(
        'У вас уже есть необработанная заявка на эту яхту',
      );
    }

    const booking = new Booking({
      id: this.nextId++,
      yachtId: yacht.id,
      yachtName: yacht.name,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      ownerId,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'pending',
    });

    this.bookings.push(booking);
    return booking;
  }

  updateStatus(
    id: number,
    ownerId: number,
    status: Extract<BookingStatus, 'approved' | 'rejected'>,
  ): Booking {
    const booking = this.findOne(id);
    if (booking.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Можно обрабатывать только заявки на свои яхты',
      );
    }
    if (booking.status !== 'pending') {
      throw new BadRequestException('Заявка уже обработана');
    }
    booking.status = status;
    return booking;
  }
}

import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('client')
  create(
    @Body() dto: CreateBookingDto,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.bookingsService.create(Number(userId), dto.yachtId);
  }

  @Get('mine')
  @UseGuards(RolesGuard)
  @Roles('client')
  findMine(@Headers('x-user-id') userId?: string) {
    return this.bookingsService.findByClient(Number(userId));
  }

  @Get('incoming')
  @UseGuards(RolesGuard)
  @Roles('admin')
  findIncoming(@Headers('x-user-id') userId?: string) {
    return this.bookingsService.findByOwner(Number(userId));
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookingStatusDto,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.bookingsService.updateStatus(
      id,
      Number(userId),
      dto.status,
    );
  }
}

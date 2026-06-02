import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RolesGuard } from '../auth/roles.guard';
import { YachtsModule } from '../yachts/yachts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [YachtsModule, UsersModule],
  controllers: [BookingsController],
  providers: [BookingsService, RolesGuard],
})
export class BookingsModule {}

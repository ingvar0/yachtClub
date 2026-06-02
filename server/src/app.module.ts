import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { YachtsModule } from './yachts/yachts.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [UsersModule, YachtsModule, BookingsModule],
})
export class AppModule {}

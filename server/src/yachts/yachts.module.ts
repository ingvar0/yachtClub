import { Module } from '@nestjs/common';
import { YachtsService } from './yachts.service';
import { YachtsController } from './yachts.controller';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  controllers: [YachtsController],
  providers: [YachtsService, RolesGuard],
  exports: [YachtsService],
})
export class YachtsModule {}

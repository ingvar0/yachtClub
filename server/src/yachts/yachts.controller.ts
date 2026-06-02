import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { YachtsService } from './yachts.service';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('yachts')
export class YachtsController {
  constructor(private readonly yachtsService: YachtsService) {}

  @Get()
  findAll() {
    return this.yachtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.yachtsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(
    @Body() dto: CreateYachtDto,
    @Headers('x-user-id') userId?: string,
  ) {
    return this.yachtsService.create(dto, Number(userId));
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateYachtDto,
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-role') role?: UserRole,
  ) {
    return this.yachtsService.update(
      id,
      dto,
      Number(userId),
      role ?? 'guest',
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-id') userId?: string,
    @Headers('x-user-role') role?: UserRole,
  ) {
    this.yachtsService.remove(id, Number(userId), role ?? 'guest');
    return { success: true };
  }
}

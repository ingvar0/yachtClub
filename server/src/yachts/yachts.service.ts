import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { UpdateYachtDto } from './dto/update-yacht.dto';
import { Yacht } from './yacht.entity';
import { UserRole } from '../users/user.entity';

@Injectable()
export class YachtsService {
  private yachts: Yacht[] = [];
  private nextId = 1;

  findAll(): Yacht[] {
    return [...this.yachts];
  }

  findOne(id: number): Yacht {
    const yacht = this.yachts.find((y) => y.id === id);
    if (!yacht) {
      throw new NotFoundException(`Яхта с id=${id} не найдена`);
    }
    return yacht;
  }

  findByAdmin(adminId: number): Yacht[] {
    return this.yachts.filter((y) => y.createdById === adminId);
  }

  create(dto: CreateYachtDto, adminId: number): Yacht {
    if (!adminId) {
      throw new BadRequestException('Не указан id администратора');
    }
    const yacht = new Yacht({
      id: this.nextId++,
      ...dto,
      createdById: adminId,
    });
    this.yachts.push(yacht);
    return yacht;
  }

  update(
    id: number,
    dto: UpdateYachtDto,
    userId: number,
    role: UserRole,
  ): Yacht {
    const yacht = this.findOne(id);
    if (role === 'admin' && yacht.createdById !== userId) {
      throw new ForbiddenException('Можно изменять только свои объявления');
    }
    const index = this.yachts.findIndex((y) => y.id === id);
    this.yachts[index] = new Yacht({ ...this.yachts[index], ...dto });
    return this.yachts[index];
  }

  remove(id: number, userId: number, role: UserRole): void {
    const yacht = this.findOne(id);
    if (role === 'admin' && yacht.createdById !== userId) {
      throw new ForbiddenException('Можно удалять только свои объявления');
    }
    this.yachts.splice(
      this.yachts.findIndex((y) => y.id === id),
      1,
    );
  }
}

import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserRole } from './user.entity';

const DEMO_PASSWORD = '123456';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User({
      id: 1,
      name: 'Анна Петрова',
      email: 'anna@example.com',
      password: DEMO_PASSWORD,
      age: 28,
      phone: '+7 900 111-22-33',
      role: 'client',
    }),
    new User({
      id: 2,
      name: 'Менеджер Яхт-Клуб',
      email: 'manager@yachtclub.ru',
      password: DEMO_PASSWORD,
      age: 35,
      phone: '+7 495 000-00-00',
      role: 'manager',
    }),
    new User({
      id: 3,
      name: 'Администратор Иван',
      email: 'admin@yachtclub.ru',
      password: DEMO_PASSWORD,
      age: 30,
      phone: '+7 495 111-11-11',
      role: 'admin',
    }),
    new User({
      id: 4,
      name: 'Администратор Мария',
      email: 'admin2@yachtclub.ru',
      password: DEMO_PASSWORD,
      age: 29,
      phone: '+7 495 222-22-22',
      role: 'admin',
    }),
  ];

  private nextId = 5;

  private toPublic(user: User): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
      role: user.role,
    });
  }

  findAll(): User[] {
    return this.users.map((u) => this.toPublic(u));
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Пользователь с id=${id} не найден`);
    }
    return this.toPublic(user);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim(),
    );
  }

  create(dto: CreateUserDto): User {
    const email = dto.email?.trim().toLowerCase();
    if (this.findByEmail(email)) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const user = new User({
      id: this.nextId++,
      name: dto.name?.trim(),
      email,
      password: dto.password,
      age: dto.age,
      phone: dto.phone?.trim(),
      role: dto.role as UserRole,
    });

    this.users.push(user);
    return this.toPublic(user);
  }

  login(dto: LoginUserDto): User {
    const email = dto.email.trim().toLowerCase();
    const user = this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден. Зарегистрируйтесь.',
      );
    }
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return this.toPublic(user);
  }
}

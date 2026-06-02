import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
  email?: string;

  @IsOptional()
  @IsInt({ message: 'Возраст должен быть целым числом' })
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsNotEmpty({ message: 'Пароль обязателен' })
  @IsString()
  @MinLength(4, { message: 'Пароль — минимум 4 символа' })
  password?: string;

  @IsNotEmpty({ message: 'Выберите роль' })
  @IsIn(['client', 'manager', 'admin'], {
    message: 'Роль: client, manager или admin',
  })
  role?: 'client' | 'manager' | 'admin';
}

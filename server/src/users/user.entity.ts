export type UserRole = 'guest' | 'client' | 'manager' | 'admin';

export class User {
  id: number;
  name: string;
  email: string;
  /** Только на сервере, в ответах API не отдаётся */
  password?: string;
  age?: number;
  phone?: string;
  role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

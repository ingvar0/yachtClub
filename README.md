# Yacht Club — аренда яхт

Клиент-серверное веб-приложение для курсовой работы по дисциплине «Разработка программного клиент-серверного приложения» (КСП).

## Стек

- **Клиент:** Next.js 14, React, TypeScript, CSS, LocalStorage
- **Сервер:** NestJS, class-validator, REST API

## Запуск

```bash
# из корня проекта
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

- Веб-приложение: **http://localhost:3000** (не открывайте 3001)
- API (NestJS): http://localhost:4000 (клиент ходит через прокси `/api`)

Если регистрация даёт 404 — порт 3001 занят Next.js, а сервер API не запущен. Остановите все `node`/`next` процессы и снова выполните `npm run dev` **из корня** `YachtClub`.

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/users` | Список пользователей (только `manager`, заголовок `x-user-role: manager`) |
| GET | `/users/by-email?email=` | Поиск пользователя для входа |
| GET | `/users/:id` | Пользователь по id |
| POST | `/users` | Регистрация (`name`, `email` обязательны; `age` опционально) |

Данные хранятся в оперативной памяти и сбрасываются при перезапуске сервера.

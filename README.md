# 🎸 Guitar Shop — запуск проекта

Полные инструкции по запуску проекта на базе Nx, NestJS, React, Prisma и Docker.

---

## 📦 Установка зависимостей

Установите все необходимые пакеты:

```bash
npm i
```

---

## 🔧 Генерация Prisma-клиента

Создайте Prisma-клиент:

```bash
npx nx prisma generate
```

---

## 🐳 Запуск Docker Compose

Поднимаем инфраструктуру (PostgreSQL, возможно, другие сервисы):

```bash
docker compose \
  --file ./backend/docker-compose.dev.yml \
  --env-file ./backend/shop.env \
  --project-name "guitar-shop" \
  up -d
```

> Убедитесь, что Docker установлен и запущен.

---

## 🌱 Сидирование базы данных

Собираем CLI-приложение и запускаем сидирование:

```bash
npx nx run cli-app:build && node dist/cli-app/main.js --seed
```

---

## 🚀 Запуск приложений

### Backend (NestJS)

Запустите **в одном терминале**:

```bash
npx nx run backend:serve
```

### Frontend (React)

Запустите **в другом терминале**:

```bash
npx nx run frontend:serve
```

---

## ✅ Готово

Теперь проект полностью поднят и готов к использованию. Проверьте, что API и frontend работают корректно.

---

> 💡 Для того, чтобы все работало корректно, создайте .env файлы в тех же местах, где есть .env-example, в таких .env можете использовать данные из .env-example. Обратите внимание,
в корне проекта лежит файл .env.example, в нем собраны все переменные окружения, требуемые для работы приложения`

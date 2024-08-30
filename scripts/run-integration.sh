#!/usr/bin/env bash

# Inject env variables into docker compose
dotenv -e .env -- docker-compose up --build -d
echo '🟡 - Waiting for database to be ready...'
while [ "`docker inspect -f {{.State.Health.Status}} ${DB_NAME}`" != "healthy" ]; do     sleep 0.1; done
echo '🟢 - Database is ready!'
pnpm migrate:dev
echo '🟡 - Waiting for migration to complete...'
while ! pnpm prisma migrate status | grep -q "Database schema is up to date"; do
  sleep 2
done
echo '🟢 - Migration is complete!'
# Run only tests in the integration workspace
vitest --project integration 
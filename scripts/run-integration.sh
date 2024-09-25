#!/usr/bin/env bash

# Inject env variables into docker compose
DIR="$(cd "$(dirname "$0")" && pwd)"
export DATABASE_URL=postgres://integration_user:pass@localhost:5432/integration_db
docker compose --profile integration up --build -d
echo '🟡 - Waiting for database to be ready...'
while [ "`docker inspect -f {{.State.Health.Status}} integration`" != "healthy" ]; do     sleep 2; done
echo '🟢 - Database is ready!'
pnpm prisma migrate dev
echo '🟡 - Waiting for migration to complete...'
while ! pnpm prisma migrate status | grep -q "Database schema is up to date"; do
  sleep 2
done
echo '🟢 - Migration is complete!'
# Run only tests in the integration workspace
vitest --project integration 
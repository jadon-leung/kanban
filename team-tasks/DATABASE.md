# Database Setup Guide

This project uses PostgreSQL with Drizzle ORM for database management.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed

## Environment Setup

1. Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://kanban_user:kanban_password@localhost:5432/kanban_db"

# Environment
NODE_ENV="development"

# Optional: Database connection details
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kanban_db
DB_USER=kanban_user
DB_PASSWORD=kanban_password
```

## Quick Start

### 1. Start PostgreSQL with Docker

```bash
npm run docker:up
```

This will start:
- PostgreSQL database on port 5432
- pgAdmin on port 5050 (optional web interface)

### 2. Generate and Apply Migrations

```bash
# Generate migration files from schema
npm run db:generate

# Apply migrations to database
npm run db:push
```

### 3. Seed the Database

```bash
npm run db:seed
```

This will populate the database with:
- Default assignees
- Default kanban columns (To Do, In Progress, Done)

## Database Schema

### Tables

- **assignees**: Team members who can be assigned to tasks
- **columns**: Kanban board columns (customizable)
- **tasks**: Individual tasks with status, priority, assignee, etc.

### Key Features

- UUID primary keys for scalability
- Proper foreign key relationships
- Timestamps for created/updated tracking
- Enums for consistent status values
- Full TypeScript type inference

## Available Scripts

```bash
# Docker commands
npm run docker:up          # Start PostgreSQL container
npm run docker:down        # Stop and remove containers
npm run docker:logs        # View PostgreSQL logs

# Database commands
npm run db:generate        # Generate migration files
npm run db:migrate         # Apply migrations
npm run db:push           # Push schema directly (dev)
npm run db:studio         # Open Drizzle Studio (GUI)
npm run db:seed           # Seed database with initial data
```

## Database Access

### pgAdmin (Web Interface)
- URL: http://localhost:5050
- Email: admin@kanban.local
- Password: admin123

Add PostgreSQL server in pgAdmin:
- Host: postgres (or localhost if external)
- Port: 5432
- Database: kanban_db
- Username: kanban_user
- Password: kanban_password

### Drizzle Studio
```bash
npm run db:studio
```
Opens a web-based database explorer at http://localhost:4983

## Production Considerations

1. **Environment Variables**: Use strong passwords and secure connection strings
2. **Migrations**: Always use `db:migrate` in production, not `db:push`
3. **Connection Pooling**: Configured for 20 max connections
4. **Health Checks**: Built-in database health check functions

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
npm run docker:logs

# Restart containers
npm run docker:down && npm run docker:up
```

### Schema Changes
```bash
# After modifying schema.ts
npm run db:generate
npm run db:push  # or db:migrate for production
```

### Reset Database
```bash
npm run docker:down
docker volume rm team-tasks_postgres_data
npm run docker:up
npm run db:push
npm run db:seed
``` 
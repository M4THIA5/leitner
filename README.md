# Leitner System API

An API dedicated to learning via the Leitner flashcard system. This project is built with a focus on Clean Code, Hexagonal Architecture, and Domain-Driven Design (DDD) principles.

## 🏗 Architecture

The project follows the **Hexagonal Architecture** (Ports & Adapters) to isolate the business logic from external concerns.

```
src/
├── domain/         # Business Logic (Entities, Repositories Interfaces)
├── application/    # Use Cases (Orchestration)
├── adapters/       # Interface Adapters (Controllers, Implementations)
└── infrastructure/ # Frameworks & Drivers (Express, Database, UI)
```

## 🛠 Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Testing**: Vitest
- **Containerization**: Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js & npm/pnpm/yarn
- Docker & Docker Compose (for the database)

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Copy `.env.example` (if available) or create a `.env` file based on the variable used in `load-env.ts` and `docker-compose.yml`.
    ```bash
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
    ```

### Running the Database

Start the PostgreSQL container:

```bash
docker-compose up -d
```

### Database Migration & Seeding

Ensure the database schema is up to date and populated with initial data:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run Migrations
npm run prisma:migrate

# Seed Data (Optional)
npm run prisma:seed
```

### Running the Application

- **Development Mode** (with hot reload):
    ```bash
    npm run dev
    ```

- **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## 🧪 Testing

Run unit and integration tests using Vitest:

```bash
npm test
```

## 📡 API Documentation

You can explore the API endpoints using the **Bruno** collection provided in the `bruno-collection/` directory.

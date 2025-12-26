import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "src/infrastructure/db/schema.prisma",
  migrations: {
    path: "src/infrastructure/db/migrations",
    seed: "tsx src/infrastructure/db/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
})

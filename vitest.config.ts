import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/tests/setup.ts"],
  },
  resolve: {
    alias: {
      "#controllers": path.resolve(__dirname, "./src/adapters/controllers"),
      "#mappers": path.resolve(__dirname, "./src/adapters/mappers"),
      "#repositories": path.resolve(__dirname, "./src/adapters/repositories"),
      "#dtos": path.resolve(__dirname, "./src/application/dtos"),
      "#use-cases": path.resolve(__dirname, "./src/application/use-cases"),
      "#entities": path.resolve(__dirname, "./src/domain/entities"),
      "#domain": path.resolve(__dirname, "./src/domain"),
      "#db": path.resolve(__dirname, "./src/infrastructure/db"),
      "#middlewares": path.resolve(__dirname, "./src/infrastructure/UI/middlewares"),
      "#routers": path.resolve(__dirname, "./src/infrastructure/UI/routers"),
      "#mocks": path.resolve(__dirname, "./src/tests/mocks"),
    },
  },
})


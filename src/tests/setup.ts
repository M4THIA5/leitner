import "#root/load-env"
import { beforeAll, afterAll } from "vitest"
import prisma from "#db/db"

beforeAll(async () => {

})

afterAll(async () => {
  await prisma.$disconnect()
})


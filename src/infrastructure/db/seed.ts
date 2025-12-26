import prisma from "#db/db"
import bcrypt from "bcrypt"

const saltRounds = 10
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds)
}

async function main() {
  const studentData = {
    name: "admin",
    email: "admin@admin.com",
    password: await hashPassword("Azerty1234!"),
  }

  const student = await prisma.student.upsert({
    where: { email: studentData.email },
    update: studentData,
    create: studentData,
  })

  console.log("Upserted student:", student)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { Student } from "#entities/Student"
import { StudentRepositoryInterface } from "#domain/repositories/StudentRepositoryInterface"
import prisma from "#db/db"
import { StudentMapper } from "#mappers/StudentMapper"

export class StudentRepository implements StudentRepositoryInterface {
  async create(student: Student): Promise<void> {
    const data = StudentMapper.toPersistence(student)
    await prisma.student.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { email },
    })

    if (!prismaStudent) return null

    return StudentMapper.toDomain(prismaStudent)
  }

  async findById(id: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { id },
    })

    if (!prismaStudent) return null

    return StudentMapper.toDomain(prismaStudent)
  }
}

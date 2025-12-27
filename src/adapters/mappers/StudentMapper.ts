import { Student } from "#entities/Student"
import { Student as PrismaStudent } from "#db/generated/prisma/client"

export class StudentMapper {
  static toDomain(prismaStudent: PrismaStudent): Student {
    return Student.create({
      id: prismaStudent.id,
      name: prismaStudent.name,
      email: prismaStudent.email,
      password: prismaStudent.password,
      lastQuizzDate: prismaStudent.lastQuizzDate || undefined,
      createdAt: prismaStudent.createdAt,
      updatedAt: prismaStudent.updatedAt,
    })
  }

  static toPersistence(student: Student): any {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      lastQuizzDate: student.lastQuizzDate,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }

  static toResponse(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      lastQuizzDate: student.lastQuizzDate,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }
}

import { Student } from "../../domain/entities/Student"
import { Student as PrismaStudent } from "../../infrastructure/db/generated/prisma/client"

export class StudentMapper {
  static toDomain(prismaStudent: PrismaStudent): Student {
    return Student.create({
      id: prismaStudent.id,
      name: prismaStudent.name,
      email: prismaStudent.email,
      password: prismaStudent.password,
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
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }

  static toResponse(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }
}

import { Student } from "../../domain/entities/Student"
import { StudentRepositoryInterface } from "../../domain/repositories/StudentRepositoryInterface"
import bcrypt from "bcrypt"
import crypto from "crypto"

export class RegisterStudent {
  constructor(private studentRepository: StudentRepositoryInterface) {}

  async execute(params: {
    name: string
    email: string
    password: string
  }): Promise<Student> {
    const existingStudent = await this.studentRepository.findByEmail(
      params.email,
    )
    if (existingStudent) {
      throw new Error("Student already exists with this email")
    }

    const hashedPassword = await bcrypt.hash(params.password, 10)
    const id = crypto.randomUUID()
    const now = new Date()

    const student = Student.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    })

    await this.studentRepository.create(student)

    return student
  }
}

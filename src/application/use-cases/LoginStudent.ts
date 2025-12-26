import { Student } from "../../domain/entities/Student"
import { StudentRepositoryInterface } from "../../domain/repositories/StudentRepositoryInterface"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class LoginStudent {
  constructor(private studentRepository: StudentRepositoryInterface) {}

  async execute(params: {
    email: string
    password: string
  }): Promise<{ student: Student; token: string }> {
    const student = await this.studentRepository.findByEmail(params.email)
    if (!student) {
      throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(
      params.password,
      student.password,
    )
    if (!isPasswordValid) {
      throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
      { sub: student.id, email: student.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" },
    )

    return { student, token }
  }
}

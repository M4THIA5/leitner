import { describe, it, expect, beforeEach } from "vitest"
import { LoginStudent } from "../../../application/use-cases/LoginStudent"
import { RegisterStudent } from "../../../application/use-cases/RegisterStudent"
import { MockStudentRepository } from "../../mocks/MockStudentRepository"

describe("LoginStudent Use Case", () => {
  let studentRepository: MockStudentRepository
  let loginStudent: LoginStudent
  let registerStudent: RegisterStudent

  beforeEach(() => {
    studentRepository = new MockStudentRepository()
    loginStudent = new LoginStudent(studentRepository)
    registerStudent = new RegisterStudent(studentRepository)
  })

  it("should login a student with correct credentials", async () => {
    const studentData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    }

    await registerStudent.execute(studentData)

    const { student, token } = await loginStudent.execute({
      email: studentData.email,
      password: studentData.password,
    })

    expect(student).not.toBeNull()
    expect(student.email).toBe(studentData.email)
    expect(token).toBeDefined()
  })

  it("should throw an error with incorrect email", async () => {
    await expect(
      loginStudent.execute({
        email: "nonexistent@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("Invalid credentials")
  })

  it("should throw an error with incorrect password", async () => {
    const studentData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    }

    await registerStudent.execute(studentData)

    await expect(
      loginStudent.execute({
        email: studentData.email,
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Invalid credentials")
  })
})

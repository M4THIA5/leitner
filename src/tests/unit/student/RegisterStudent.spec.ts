import { describe, it, expect, beforeEach } from "vitest"
import { RegisterStudent } from "#use-cases/RegisterStudent"
import { MockStudentRepository } from "#mocks/MockStudentRepository"
import bcrypt from "bcrypt"

describe("RegisterStudent Use Case", () => {
  let studentRepository: MockStudentRepository
  let registerStudent: RegisterStudent

  beforeEach(() => {
    studentRepository = new MockStudentRepository()
    registerStudent = new RegisterStudent(studentRepository)
  })

  it("should register a new student", async () => {
    const studentData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    }

    const student = await registerStudent.execute(studentData)

    expect(student.id).toBeDefined()
    expect(student.name).toBe(studentData.name)
    expect(student.email).toBe(studentData.email)
    expect(await bcrypt.compare(studentData.password, student.password)).toBe(
      true,
    )

    const savedStudent = await studentRepository.findByEmail(studentData.email)
    expect(savedStudent).not.toBeNull()
    expect(savedStudent?.id).toBe(student.id)
  })

  it("should throw an error if student already exists", async () => {
    const studentData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    }

    await registerStudent.execute(studentData)

    await expect(registerStudent.execute(studentData)).rejects.toThrow(
      "Student already exists with this email",
    )
  })
})

import { Student } from "../../domain/entities/Student"
import { StudentRepositoryInterface } from "../../domain/repositories/StudentRepositoryInterface"

export class MockStudentRepository implements StudentRepositoryInterface {
  private students: Student[] = []

  async create(student: Student): Promise<void> {
    this.students.push(student)
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.students.find((s) => s.email === email) || null
  }

  async findById(id: string): Promise<Student | null> {
    return this.students.find((s) => s.id === id) || null
  }
}

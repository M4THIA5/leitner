import { Student } from "#entities/Student"
import { StudentRepositoryInterface } from "#domain/repositories/StudentRepositoryInterface"

export class MockStudentRepository implements StudentRepositoryInterface {
  private students: Student[] = []

  async create(student: Student): Promise<void> {
    this.students.push(student)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((s) => s.email === email)
    return student || null
  }

  async findById(id: string): Promise<Student | null> {
    const student = this.students.find((s) => s.id === id)
    return student || null
  }

  async update(student: Student): Promise<void> {
    const index = this.students.findIndex((s) => s.id === student.id)
    if (index !== -1) {
      this.students[index] = student
    }
  }
}

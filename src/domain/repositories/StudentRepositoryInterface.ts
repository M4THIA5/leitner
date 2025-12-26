import { Student } from "../entities/Student"

export interface StudentRepositoryInterface {
  create(student: Student): Promise<void>
  findByEmail(email: string): Promise<Student | null>
  findById(id: string): Promise<Student | null>
}

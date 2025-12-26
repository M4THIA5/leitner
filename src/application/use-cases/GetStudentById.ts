import { Student } from "#entities/Student"
import { StudentRepositoryInterface } from "#domain/repositories/StudentRepositoryInterface"

export class GetStudentById {
  constructor(private studentRepository: StudentRepositoryInterface) {}

  async execute(id: string): Promise<Student> {
    const student = await this.studentRepository.findById(id)
    if (!student) {
      throw new Error("Student not found")
    }
    return student
  }
}

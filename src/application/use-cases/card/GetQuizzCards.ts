import { ICardRepository } from "#domain/repositories/ICardRepository"
import { StudentRepositoryInterface } from "#domain/repositories/StudentRepositoryInterface"
import { Card } from "#entities/Card"
import { Student } from "#entities/Student"

export class GetQuizzCards {
  constructor(
    private cardRepository: ICardRepository,
    private studentRepository: StudentRepositoryInterface,
  ) {}

  async execute(studentId: string, date?: string): Promise<Card[]> {
    const quizzDate = date ? new Date(date) : new Date()
    const student = await this.studentRepository.findById(studentId)

    if (!student) {
      throw new Error("Student not found")
    }

    if (student.lastQuizzDate) {
      const lastQuizz = new Date(student.lastQuizzDate)
      if (
        lastQuizz.getFullYear() === quizzDate.getFullYear() &&
        lastQuizz.getMonth() === quizzDate.getMonth() &&
        lastQuizz.getDate() === quizzDate.getDate()
      ) {
        throw new Error("You have already done your quizz today")
      }
    }

    const cards = await this.cardRepository.findForQuizz(studentId, quizzDate)

    const updatedStudent = Student.create({
      ...student,
      lastQuizzDate: quizzDate,
    })
    
    await this.studentRepository.update(updatedStudent)

    return cards
  }
}

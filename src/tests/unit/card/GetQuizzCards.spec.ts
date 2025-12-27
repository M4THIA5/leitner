import { describe, it, expect, beforeEach } from "vitest"
import { GetQuizzCards } from "#use-cases/card/GetQuizzCards"
import { MockCardRepository } from "#mocks/MockCardRepository"
import { MockStudentRepository } from "#mocks/MockStudentRepository"
import { Card } from "#entities/Card"
import { Student } from "#entities/Student"

describe("GetQuizzCards", () => {
  let getQuizzCards: GetQuizzCards
  let mockCardRepository: MockCardRepository
  let mockStudentRepository: MockStudentRepository
  const studentId = "student-1"

  beforeEach(async () => {
    mockCardRepository = new MockCardRepository()
    mockStudentRepository = new MockStudentRepository()
    getQuizzCards = new GetQuizzCards(mockCardRepository, mockStudentRepository)

    // Setup student
    const student = Student.create({
      id: studentId,
      name: "Test Student",
      email: "test@test.com",
      password: "pass",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await mockStudentRepository.create(student)
  })

  it("should fetch cards for quizz if never played", async () => {
    const card1 = Card.create({ id: "1", question: "Q1", answer: "A1", studentId })
    await mockCardRepository.save(card1)

    const cards = await getQuizzCards.execute(studentId)
    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe("1")
    
    // Check execution date is updated
    const updatedStudent = await mockStudentRepository.findById(studentId)
    expect(updatedStudent?.lastQuizzDate).toBeDefined()
  })

  it("should throw if quizz already done today", async () => {
    const today = new Date()
    const student = await mockStudentRepository.findById(studentId)
    await mockStudentRepository.update(Student.create({
      ...student!,
      lastQuizzDate: today
    }))

    await expect(getQuizzCards.execute(studentId, today.toISOString())).rejects.toThrow("You have already done your quizz today")
  })
})

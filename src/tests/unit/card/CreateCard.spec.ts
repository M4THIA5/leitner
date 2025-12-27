import { describe, it, expect, beforeEach } from "vitest"
import { CreateCard } from "#use-cases/card/CreateCard"
import { MockCardRepository } from "#mocks/MockCardRepository"
import { Category } from "#entities/Category"

describe("CreateCard", () => {
  let createCard: CreateCard
  let mockCardRepository: MockCardRepository

  beforeEach(() => {
    mockCardRepository = new MockCardRepository()
    createCard = new CreateCard(mockCardRepository)
  })

  it("should create a new card with initial category FIRST", async () => {
    const dto = {
      question: "What is clean code?",
      answer: "Easy to understand and change",
      tag: "Software"
    }
    const studentId = "student-1"

    const card = await createCard.execute(dto, studentId)

    expect(card.question).toBe(dto.question)
    expect(card.answer).toBe(dto.answer)
    expect(card.tag).toBe(dto.tag)
    expect(card.category).toBe(Category.FIRST)
    expect(card.studentId).toBe(studentId)
    
    const savedCard = await mockCardRepository.findById(card.id)
    expect(savedCard).toBeDefined()
  })
})

import { describe, it, expect, beforeEach } from "vitest"
import { AnswerCard } from "#use-cases/card/AnswerCard"
import { MockCardRepository } from "#mocks/MockCardRepository"
import { Card } from "#entities/Card"
import { Category } from "#entities/Category"

describe("AnswerCard", () => {
  let answerCard: AnswerCard
  let mockCardRepository: MockCardRepository

  beforeEach(() => {
    mockCardRepository = new MockCardRepository()
    answerCard = new AnswerCard(mockCardRepository)
  })

  it("should progression to SECOND category if valid answer in FIRST", async () => {
    const card = Card.create({
      id: "card-1",
      question: "Q",
      answer: "A",
      studentId: "student-1",
      category: Category.FIRST
    })
    await mockCardRepository.save(card)

    await answerCard.execute(card.id, "student-1", true)

    const updatedCard = await mockCardRepository.findById(card.id)
    expect(updatedCard?.category).toBe(Category.SECOND)
  })

  it("should return to FIRST category if answer is invalid", async () => {
    const card = Card.create({
      id: "card-1",
      question: "Q",
      answer: "A",
      studentId: "student-1",
      category: Category.THIRD
    })
    await mockCardRepository.save(card)

    await answerCard.execute(card.id, "student-1", false)

    const updatedCard = await mockCardRepository.findById(card.id)
    expect(updatedCard?.category).toBe(Category.FIRST)
  })

  it("should set category to DONE if valid answer in SEVENTH", async () => {
    const card = Card.create({
      id: "card-1",
      question: "Q",
      answer: "A",
      studentId: "student-1",
      category: Category.SEVENTH
    })
    await mockCardRepository.save(card)

    await answerCard.execute(card.id, "student-1", true)

    const updatedCard = await mockCardRepository.findById(card.id)
    expect(updatedCard?.category).toBe(Category.DONE)
  })
})

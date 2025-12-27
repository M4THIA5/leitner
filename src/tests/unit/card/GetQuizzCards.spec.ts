import { describe, it, expect, beforeEach } from "vitest"
import { GetQuizzCards } from "#use-cases/card/GetQuizzCards"
import { MockCardRepository } from "#mocks/MockCardRepository"
import { Card } from "#entities/Card"

describe("GetQuizzCards", () => {
  let getQuizzCards: GetQuizzCards
  let mockCardRepository: MockCardRepository

  beforeEach(() => {
    mockCardRepository = new MockCardRepository()
    getQuizzCards = new GetQuizzCards(mockCardRepository)
  })

  it("should fetch cards for quizz", async () => {
    const card1 = Card.create({ id: "1", question: "Q1", answer: "A1", studentId: "s1" })
    await mockCardRepository.save(card1)

    const cards = await getQuizzCards.execute("s1")
    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe("1")
  })
})

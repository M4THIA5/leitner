import { describe, it, expect, beforeEach } from "vitest"
import { ListCards } from "#use-cases/card/ListCards"
import { MockCardRepository } from "#mocks/MockCardRepository"
import { Card } from "#entities/Card"

describe("ListCards", () => {
  let listCards: ListCards
  let mockCardRepository: MockCardRepository

  beforeEach(() => {
    mockCardRepository = new MockCardRepository()
    listCards = new ListCards(mockCardRepository)
  })

  it("should list all cards for a student", async () => {
    const card1 = Card.create({ id: "1", question: "Q1", answer: "A1", studentId: "s1" })
    const card2 = Card.create({ id: "2", question: "Q2", answer: "A2", studentId: "s1" })
    const card3 = Card.create({ id: "3", question: "Q3", answer: "A3", studentId: "s2" })
    
    await mockCardRepository.save(card1)
    await mockCardRepository.save(card2)
    await mockCardRepository.save(card3)

    const cards = await listCards.execute("s1")
    expect(cards).toHaveLength(2)
    expect(cards.map(c => c.id)).toContain("1")
    expect(cards.map(c => c.id)).toContain("2")
  })

  it("should filter by tags", async () => {
    const card1 = Card.create({ id: "1", question: "Q1", answer: "A1", studentId: "s1", tag: "T1" })
    const card2 = Card.create({ id: "2", question: "Q2", answer: "A2", studentId: "s1", tag: "T2" })
    
    await mockCardRepository.save(card1)
    await mockCardRepository.save(card2)

    const cards = await listCards.execute("s1", ["T1"])
    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe("1")
  })
})

import { describe, it, expect, beforeEach } from "vitest"
import { ListUserFlashcards } from "#use-cases/flashcard/ListUserFlashcards"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"
import { Flashcard } from "#entities/Flashcard"

describe("ListUserFlashcards Use Case", () => {
  let flashcardRepository: MockFlashcardRepository
  let listUserFlashcards: ListUserFlashcards

  beforeEach(() => {
    flashcardRepository = new MockFlashcardRepository()
    listUserFlashcards = new ListUserFlashcards(flashcardRepository)
  })

  it("should list flashcards for a specific student", async () => {
    const f1 = Flashcard.create({
      id: "f1",
      question: "Q1",
      answer: "A1",
      studentId: "student-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const f2 = Flashcard.create({
      id: "f2",
      question: "Q2",
      answer: "A2",
      studentId: "student-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const f3 = Flashcard.create({
      id: "f3",
      question: "Q3",
      answer: "A3",
      studentId: "other-student",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await flashcardRepository.save(f1)
    await flashcardRepository.save(f2)
    await flashcardRepository.save(f3)

    const result = await listUserFlashcards.execute("student-1")

    expect(result).toHaveLength(2)
    expect(result).toContainEqual(f1)
    expect(result).toContainEqual(f2)
    expect(result).not.toContainEqual(f3)
  })

  it("should return empty array if student has no flashcards", async () => {
    const result = await listUserFlashcards.execute("student-1")
    expect(result).toEqual([])
  })
})

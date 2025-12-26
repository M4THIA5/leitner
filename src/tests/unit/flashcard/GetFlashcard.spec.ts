import { describe, it, expect, beforeEach } from "vitest"
import { GetFlashcard } from "#use-cases/flashcard/GetFlashcard"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"
import { Flashcard } from "#entities/Flashcard"

describe("GetFlashcard Use Case", () => {
  let flashcardRepository: MockFlashcardRepository
  let getFlashcard: GetFlashcard

  beforeEach(() => {
    flashcardRepository = new MockFlashcardRepository()
    getFlashcard = new GetFlashcard(flashcardRepository)
  })

  it("should return a flashcard when it exists and belongs to the student", async () => {
    const flashcard = Flashcard.create({
      id: "flashcard-1",
      question: "Q",
      answer: "A",
      studentId: "student-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await flashcardRepository.save(flashcard)

    const result = await getFlashcard.execute("flashcard-1", "student-1")

    expect(result).toEqual(flashcard)
  })

  it("should throw an error when flashcard does not exist", async () => {
    await expect(getFlashcard.execute("non-existent", "student-1")).rejects.toThrow("Flashcard not found")
  })

  it("should throw an error when flashcard does not belong to the student", async () => {
    const flashcard = Flashcard.create({
      id: "flashcard-1",
      question: "Q",
      answer: "A",
      studentId: "other-student",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await flashcardRepository.save(flashcard)

    await expect(getFlashcard.execute("flashcard-1", "student-1")).rejects.toThrow("Unauthorized access to flashcard")
  })
})

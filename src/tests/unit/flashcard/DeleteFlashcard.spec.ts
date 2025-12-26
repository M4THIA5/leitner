import { describe, it, expect, beforeEach } from "vitest"
import { DeleteFlashcard } from "#use-cases/flashcard/DeleteFlashcard"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"
import { Flashcard } from "#entities/Flashcard"

describe("DeleteFlashcard Use Case", () => {
  let flashcardRepository: MockFlashcardRepository
  let deleteFlashcard: DeleteFlashcard

  beforeEach(() => {
    flashcardRepository = new MockFlashcardRepository()
    deleteFlashcard = new DeleteFlashcard(flashcardRepository)
  })

  it("should delete an existing flashcard", async () => {
    const flashcard = Flashcard.create({
      id: "flashcard-1",
      question: "Q",
      answer: "A",
      studentId: "student-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await flashcardRepository.save(flashcard)

    await deleteFlashcard.execute("flashcard-1", "student-1")

    const result = await flashcardRepository.findById("flashcard-1")
    expect(result).toBeNull()
  })

  it("should throw an error when flashcard not found", async () => {
    await expect(deleteFlashcard.execute("non-existent", "student-1")).rejects.toThrow("Flashcard not found")
  })

  it("should throw an error when unauthorized", async () => {
    const flashcard = Flashcard.create({
      id: "flashcard-1",
      question: "Q",
      answer: "A",
      studentId: "other-student",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await flashcardRepository.save(flashcard)

    await expect(deleteFlashcard.execute("flashcard-1", "student-1")).rejects.toThrow("Unauthorized access to flashcard")
  })
})

import { describe, it, expect, beforeEach } from "vitest"
import { UpdateFlashcard } from "#use-cases/flashcard/UpdateFlashcard"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"
import { Flashcard } from "#entities/Flashcard"

describe("UpdateFlashcard Use Case", () => {
  let flashcardRepository: MockFlashcardRepository
  let updateFlashcard: UpdateFlashcard

  beforeEach(() => {
    flashcardRepository = new MockFlashcardRepository()
    updateFlashcard = new UpdateFlashcard(flashcardRepository)
  })

  it("should update an existing flashcard", async () => {
    const flashcard = Flashcard.create({
      id: "flashcard-1",
      question: "Old Q",
      answer: "Old A",
      studentId: "student-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["tag1"],
    })
    await flashcardRepository.save(flashcard)

    const dto = {
      id: "flashcard-1",
      question: "New Q",
      answer: "New A",
      tags: ["tag2"],
      studentId: "student-1",
    }

    const result = await updateFlashcard.execute(dto)

    expect(result.question).toBe(dto.question)
    expect(result.answer).toBe(dto.answer)
    expect(result.tags).toEqual(dto.tags)
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(flashcard.updatedAt.getTime())

    const updatedFlashcard = await flashcardRepository.findById("flashcard-1")
    expect(updatedFlashcard?.question).toBe(dto.question)
  })

  it("should throw an error when flashcard not found", async () => {
    const dto = {
      id: "non-existent",
      studentId: "student-1",
    }
    await expect(updateFlashcard.execute(dto)).rejects.toThrow("Flashcard not found")
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

    const dto = {
      id: "flashcard-1",
      studentId: "student-1",
    }
    await expect(updateFlashcard.execute(dto)).rejects.toThrow("Unauthorized access to flashcard")
  })
})

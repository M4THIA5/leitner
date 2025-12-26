import { describe, it, expect, beforeEach } from "vitest"
import { CreateFlashcard } from "#use-cases/flashcard/CreateFlashcard"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"

describe("CreateFlashcard Use Case", () => {
  let flashcardRepository: MockFlashcardRepository
  let createFlashcard: CreateFlashcard

  beforeEach(() => {
    flashcardRepository = new MockFlashcardRepository()
    createFlashcard = new CreateFlashcard(flashcardRepository)
  })

  it("should create a new flashcard", async () => {
    const dto = {
      question: "What is clean code?",
      answer: "Code that is easy to read and easy to maintain.",
      studentId: "student-1",
      tags: ["clean-code", "principles"],
    }

    const result = await createFlashcard.execute(dto)

    expect(result.id).toBeDefined()
    expect(result.question).toBe(dto.question)
    expect(result.answer).toBe(dto.answer)
    expect(result.studentId).toBe(dto.studentId)
    expect(result.tags).toEqual(dto.tags)
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(result.updatedAt).toBeInstanceOf(Date)

    const savedFlashcard = await flashcardRepository.findById(result.id)
    expect(savedFlashcard).toEqual(result)
  })
})

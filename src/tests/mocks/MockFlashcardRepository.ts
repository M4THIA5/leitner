import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"

export class MockFlashcardRepository implements IFlashcardRepository {
  private flashcards: Flashcard[] = []

  async save(flashcard: Flashcard): Promise<void> {
    this.flashcards.push(flashcard)
  }

  async findById(id: string): Promise<Flashcard | null> {
    const flashcard = this.flashcards.find((f) => f.id === id)
    return flashcard || null
  }

  async findByStudentId(studentId: string): Promise<Flashcard[]> {
    return this.flashcards.filter((f) => f.studentId === studentId)
  }

  async update(flashcard: Flashcard): Promise<void> {
    const index = this.flashcards.findIndex((f) => f.id === flashcard.id)
    if (index !== -1) {
      this.flashcards[index] = flashcard
    }
  }

  async delete(id: string): Promise<void> {
    this.flashcards = this.flashcards.filter((f) => f.id !== id)
  }
}

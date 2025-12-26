import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"

export class GetFlashcard {
  constructor(private readonly flashcardRepository: IFlashcardRepository) {}

  async execute(id: string, studentId: string): Promise<Flashcard> {
    const flashcard = await this.flashcardRepository.findById(id)

    if (!flashcard) {
      throw new Error("Flashcard not found")
    }

    if (flashcard.studentId !== studentId) {
      throw new Error("Unauthorized access to flashcard")
    }

    return flashcard
  }
}

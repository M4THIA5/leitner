import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"

export class DeleteFlashcard {
  constructor(private readonly flashcardRepository: IFlashcardRepository) {}

  async execute(id: string, studentId: string): Promise<void> {
    const flashcard = await this.flashcardRepository.findById(id)

    if (!flashcard) {
      throw new Error("Flashcard not found")
    }

    if (flashcard.studentId !== studentId) {
      throw new Error("Unauthorized access to flashcard")
    }

    await this.flashcardRepository.delete(id)
  }
}

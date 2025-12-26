import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"

export class ListUserFlashcards {
  constructor(private readonly flashcardRepository: IFlashcardRepository) {}

  async execute(studentId: string): Promise<Flashcard[]> {
    return this.flashcardRepository.findByStudentId(studentId)
  }
}

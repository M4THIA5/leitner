import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"
import { UpdateFlashcardDTO } from "#dtos/flashcard/UpdateFlashcardDTO"
export class UpdateFlashcard {
  constructor(private readonly flashcardRepository: IFlashcardRepository) {}

  async execute(dto: UpdateFlashcardDTO): Promise<Flashcard> {
    const flashcard = await this.flashcardRepository.findById(dto.id)

    if (!flashcard) {
      throw new Error("Flashcard not found")
    }

    if (flashcard.studentId !== dto.studentId) {
      throw new Error("Unauthorized access to flashcard")
    }

    const updatedFlashcard = Flashcard.create({
      ...flashcard,
      question: dto.question ?? flashcard.question,
      answer: dto.answer ?? flashcard.answer,
      tags: dto.tags ?? flashcard.tags,
      updatedAt: new Date(),
    } as any)

    await this.flashcardRepository.update(updatedFlashcard)
    return updatedFlashcard
  }
}

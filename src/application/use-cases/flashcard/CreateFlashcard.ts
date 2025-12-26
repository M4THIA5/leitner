import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"
import { CreateFlashcardDTO } from "#dtos/flashcard/CreateFlashcardDTO"
export class CreateFlashcard {
  constructor(private readonly flashcardRepository: IFlashcardRepository) {}

  async execute(dto: CreateFlashcardDTO): Promise<Flashcard> {
    const flashcard = Flashcard.create({
      id: crypto.randomUUID(),
      question: dto.question,
      answer: dto.answer,
      studentId: dto.studentId,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: dto.tags,
    })

    await this.flashcardRepository.save(flashcard)
    return flashcard
  }
}

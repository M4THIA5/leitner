import { Flashcard } from "#entities/Flashcard"
import { Flashcard as PrismaFlashcard, Tag as PrismaTag } from "#db/generated/prisma/client"

export type PrismaFlashcardWithTags = PrismaFlashcard & { tags: PrismaTag[] }

export class FlashcardMapper {
  static toDomain(prismaFlashcard: PrismaFlashcardWithTags): Flashcard {
    return Flashcard.create({
      id: prismaFlashcard.id,
      question: prismaFlashcard.question,
      answer: prismaFlashcard.answer,
      studentId: prismaFlashcard.studentId,
      createdAt: prismaFlashcard.createdAt,
      updatedAt: prismaFlashcard.updatedAt,
      tags: prismaFlashcard.tags.map((tag) => tag.name),
    })
  }

  static toPersistence(flashcard: Flashcard): any {
    return {
      id: flashcard.id,
      question: flashcard.question,
      answer: flashcard.answer,
      studentId: flashcard.studentId,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt,
    }
  }

  static toResponse(flashcard: Flashcard) {
    return {
      id: flashcard.id,
      question: flashcard.question,
      answer: flashcard.answer,
      studentId: flashcard.studentId,
      tags: flashcard.tags,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt,
    }
  }
}

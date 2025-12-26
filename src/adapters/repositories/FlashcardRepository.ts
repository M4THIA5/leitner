import { Flashcard } from "#entities/Flashcard"
import { IFlashcardRepository } from "#domain/repositories/IFlashcardRepository"
import prisma from "#db/db"
import { FlashcardMapper } from "#mappers/FlashcardMapper"

export class FlashcardRepository implements IFlashcardRepository {
  async save(flashcard: Flashcard): Promise<void> {
    const data = FlashcardMapper.toPersistence(flashcard)
    await prisma.flashcard.create({
      data: {
        ...data,
        tags: {
          connectOrCreate: flashcard.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    })
  }

  async findById(id: string): Promise<Flashcard | null> {
    const prismaFlashcard = await prisma.flashcard.findUnique({
      where: { id },
      include: { tags: true },
    })

    if (!prismaFlashcard) return null

    return FlashcardMapper.toDomain(prismaFlashcard as any)
  }

  async findByStudentId(studentId: string): Promise<Flashcard[]> {
    const prismaFlashcards = await prisma.flashcard.findMany({
      where: { studentId },
      include: { tags: true },
    })

    return prismaFlashcards.map((f) => FlashcardMapper.toDomain(f as any))
  }

  async update(flashcard: Flashcard): Promise<void> {
    await prisma.flashcard.update({
      where: { id: flashcard.id },
      data: {
        question: flashcard.question,
        answer: flashcard.answer,
        updatedAt: flashcard.updatedAt,
        tags: {
          set: [], // Disconnect all current tags
          connectOrCreate: flashcard.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.flashcard.delete({
      where: { id },
    })
  }
}

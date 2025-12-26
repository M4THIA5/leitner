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
          create: flashcard.tags.map((name) => ({ name })),
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
    // We'll handle tags update by deleting old tags and creating new ones for simplicity
    // or we could do something more sophisticated. 
    // Given the Tag model has a required flashcardId, this is a reasonable approach for a first implementation.
    
    await prisma.$transaction([
      prisma.tag.deleteMany({
        where: { flashcardId: flashcard.id },
      }),
      prisma.flashcard.update({
        where: { id: flashcard.id },
        data: {
          question: flashcard.question,
          answer: flashcard.answer,
          updatedAt: flashcard.updatedAt,
          tags: {
            create: flashcard.tags.map((name) => ({ name })),
          },
        },
      }),
    ])
  }

  async delete(id: string): Promise<void> {
    // Delete tags first due to foreign key constraints if not using CASCADE
    await prisma.tag.deleteMany({
      where: { flashcardId: id },
    })
    await prisma.flashcard.delete({
      where: { id },
    })
  }
}

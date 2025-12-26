import { Tag } from "#entities/Tag"
import { ITagRepository } from "#domain/repositories/ITagRepository"
import prisma from "#db/db"

export class TagRepository implements ITagRepository {
  async save(tag: Tag): Promise<void> {
    await prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      },
    })
  }

  async findById(id: string): Promise<Tag | null> {
    const prismaTag = await prisma.tag.findUnique({
      where: { id },
    })

    if (!prismaTag) return null

    return Tag.create({
      id: prismaTag.id,
      name: prismaTag.name,
      createdAt: prismaTag.createdAt,
      updatedAt: prismaTag.updatedAt,
    })
  }

  async findByName(name: string): Promise<Tag | null> {
    const prismaTag = await prisma.tag.findUnique({
      where: { name },
    })

    if (!prismaTag) return null

    return Tag.create({
      id: prismaTag.id,
      name: prismaTag.name,
      createdAt: prismaTag.createdAt,
      updatedAt: prismaTag.updatedAt,
    })
  }

  async findAll(): Promise<Tag[]> {
    const prismaTags = await prisma.tag.findMany()

    return prismaTags.map((tag) =>
      Tag.create({
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      }),
    )
  }

  async update(tag: Tag): Promise<void> {
    await prisma.tag.update({
      where: { id: tag.id },
      data: {
        name: tag.name,
        updatedAt: tag.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.tag.delete({
      where: { id },
    })
  }
}

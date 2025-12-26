import { Tag } from "#entities/Tag"
import { ITagRepository } from "#domain/repositories/ITagRepository"
import { CreateTagDTO } from "#dtos/tag/CreateTagDTO"

export class CreateTag {
  constructor(private readonly tagRepository: ITagRepository) {}

  async execute(dto: CreateTagDTO): Promise<Tag> {
    const existingTag = await this.tagRepository.findByName(dto.name)
    if (existingTag) {
      return existingTag
    }

    const tag = Tag.create({
      id: crypto.randomUUID(),
      name: dto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.tagRepository.save(tag)
    return tag
  }
}

import { Tag } from "#entities/Tag"
import { ITagRepository } from "#domain/repositories/ITagRepository"

export interface UpdateTagDTO {
  id: string
  name: string
}

export class UpdateTag {
  constructor(private readonly tagRepository: ITagRepository) {}

  async execute(dto: UpdateTagDTO): Promise<Tag> {
    const tag = await this.tagRepository.findById(dto.id)
    if (!tag) {
      throw new Error("Tag not found")
    }

    const updatedTag = Tag.create({
      ...tag,
      name: dto.name,
      updatedAt: new Date(),
    })

    await this.tagRepository.update(updatedTag)
    return updatedTag
  }
}

import { Tag } from "#entities/Tag"

export class TagMapper {
  static toResponse(tag: Tag) {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    }
  }
}

import { Tag } from "#entities/Tag"
import { ITagRepository } from "#domain/repositories/ITagRepository"

export class ListTags {
  constructor(private readonly tagRepository: ITagRepository) {}

  async execute(): Promise<Tag[]> {
    return this.tagRepository.findAll()
  }
}

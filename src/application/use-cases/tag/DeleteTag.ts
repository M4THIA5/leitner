import { ITagRepository } from "#domain/repositories/ITagRepository"

export class DeleteTag {
  constructor(private readonly tagRepository: ITagRepository) {}

  async execute(id: string): Promise<void> {
    await this.tagRepository.delete(id)
  }
}

import { Tag } from "#entities/Tag"
import { ITagRepository } from "#domain/repositories/ITagRepository"

export class MockTagRepository implements ITagRepository {
  private tags: Tag[] = []

  async save(tag: Tag): Promise<void> {
    this.tags.push(tag)
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = this.tags.find((t) => t.id === id)
    return tag || null
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = this.tags.find((t) => t.name === name)
    return tag || null
  }

  async findAll(): Promise<Tag[]> {
    return this.tags
  }

  async update(tag: Tag): Promise<void> {
    const index = this.tags.findIndex((t) => t.id === tag.id)
    if (index !== -1) {
      this.tags[index] = tag
    }
  }

  async delete(id: string): Promise<void> {
    this.tags = this.tags.filter((t) => t.id !== id)
  }
}

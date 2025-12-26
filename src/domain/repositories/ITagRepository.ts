import { Tag } from "#entities/Tag"

export interface ITagRepository {
  save(tag: Tag): Promise<void>
  findById(id: string): Promise<Tag | null>
  findByName(name: string): Promise<Tag | null>
  findAll(): Promise<Tag[]>
  update(tag: Tag): Promise<void>
  delete(id: string): Promise<void>
}

import { NextFunction, Request, Response } from "express"
import { TagRepository } from "#repositories/TagRepository"
import { FlashcardRepository } from "#repositories/FlashcardRepository"
import { CreateTag } from "#use-cases/tag/CreateTag"
import { ListTags } from "#use-cases/tag/ListTags"
import { UpdateTag } from "#use-cases/tag/UpdateTag"
import { DeleteTag } from "#use-cases/tag/DeleteTag"
import { UpdateFlashcard } from "#use-cases/flashcard/UpdateFlashcard"
import { TagMapper } from "#mappers/TagMapper"

export class TagController {
  private createTagUseCase: CreateTag
  private listTagsUseCase: ListTags
  private updateTagUseCase: UpdateTag
  private deleteTagUseCase: DeleteTag

  constructor() {
    const tagRepository = new TagRepository()
    this.createTagUseCase = new CreateTag(tagRepository)
    this.listTagsUseCase = new ListTags(tagRepository)
    this.updateTagUseCase = new UpdateTag(tagRepository)
    this.deleteTagUseCase = new DeleteTag(tagRepository)
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await this.createTagUseCase.execute(req.body)
      res.status(201).json(TagMapper.toResponse(tag))
    } catch (error) {
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await this.listTagsUseCase.execute()
      res.status(200).json(tags.map(TagMapper.toResponse))
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await this.updateTagUseCase.execute({
        id: req.params.id,
        name: req.body.name,
      })
      res.status(200).json(TagMapper.toResponse(tag))
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteTagUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

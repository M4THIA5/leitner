import { NextFunction, Response } from "express"
import { AuthRequest } from "#middlewares/authMiddleware"
import { FlashcardRepository } from "#repositories/FlashcardRepository"
import { CreateFlashcard } from "#use-cases/flashcard/CreateFlashcard"
import { GetFlashcard } from "#use-cases/flashcard/GetFlashcard"
import { UpdateFlashcard } from "#use-cases/flashcard/UpdateFlashcard"
import { DeleteFlashcard } from "#use-cases/flashcard/DeleteFlashcard"
import { ListUserFlashcards } from "#use-cases/flashcard/ListUserFlashcards"
import { FlashcardMapper } from "#mappers/FlashcardMapper"

export class FlashcardController {
  private createFlashcardUseCase: CreateFlashcard
  private getFlashcardUseCase: GetFlashcard
  private updateFlashcardUseCase: UpdateFlashcard
  private deleteFlashcardUseCase: DeleteFlashcard
  private listUserFlashcardsUseCase: ListUserFlashcards

  constructor() {
    const flashcardRepository = new FlashcardRepository()
    this.createFlashcardUseCase = new CreateFlashcard(flashcardRepository)
    this.getFlashcardUseCase = new GetFlashcard(flashcardRepository)
    this.updateFlashcardUseCase = new UpdateFlashcard(flashcardRepository)
    this.deleteFlashcardUseCase = new DeleteFlashcard(flashcardRepository)
    this.listUserFlashcardsUseCase = new ListUserFlashcards(flashcardRepository)
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const dto = req.body
      dto.studentId = studentId
      const flashcard = await this.createFlashcardUseCase.execute(dto)

      res.status(201).json(FlashcardMapper.toResponse(flashcard))
    } catch (error) {
      next(error)
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const { id } = req.params
      const flashcard = await this.getFlashcardUseCase.execute(id, studentId)

      res.status(200).json(FlashcardMapper.toResponse(flashcard))
    } catch (error) {
      next(error)
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const { id } = req.params
      const dto = req.body
      dto.id = id
      dto.studentId = studentId
      const flashcard = await this.updateFlashcardUseCase.execute(dto)

      res.status(200).json(FlashcardMapper.toResponse(flashcard))
    } catch (error) {
      next(error)
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const { id } = req.params
      await this.deleteFlashcardUseCase.execute(id, studentId)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const flashcards = await this.listUserFlashcardsUseCase.execute(studentId)

      res.status(200).json(flashcards.map(FlashcardMapper.toResponse))
    } catch (error) {
      next(error)
    }
  }
}

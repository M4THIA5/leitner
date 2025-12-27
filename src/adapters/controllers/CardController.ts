import { NextFunction, Response } from "express"
import { AuthRequest } from "#middlewares/authMiddleware"
import { CardRepository } from "#repositories/CardRepository"
import { CreateCard } from "#use-cases/card/CreateCard"
import { ListCards } from "#use-cases/card/ListCards"
import { AnswerCard } from "#use-cases/card/AnswerCard"
import { GetQuizzCards } from "#use-cases/card/GetQuizzCards"
import { CardMapper } from "#mappers/CardMapper"

export class CardController {
  private createCardUseCase: CreateCard
  private listCardsUseCase: ListCards
  private answerCardUseCase: AnswerCard
  private getQuizzCardsUseCase: GetQuizzCards

  constructor() {
    const cardRepository = new CardRepository()
    this.createCardUseCase = new CreateCard(cardRepository)
    this.listCardsUseCase = new ListCards(cardRepository)
    this.answerCardUseCase = new AnswerCard(cardRepository)
    this.getQuizzCardsUseCase = new GetQuizzCards(cardRepository)
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const card = await this.createCardUseCase.execute(req.body, studentId)
      res.status(201).json(CardMapper.toResponse(card))
    } catch (error) {
      next(error)
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const tags = req.query.tags ? (req.query.tags as string).split(",") : undefined
      const cards = await this.listCardsUseCase.execute(studentId, tags)

      res.status(200).json(cards.map(CardMapper.toResponse))
    } catch (error) {
      next(error)
    }
  }

  async getQuizz(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const date = req.query.date as string | undefined
      const cards = await this.getQuizzCardsUseCase.execute(studentId, date)

      res.status(200).json(cards.map(CardMapper.toResponse))
    } catch (error) {
      next(error)
    }
  }

  async answer(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) throw new Error("Unauthorized")

      const { cardId } = req.params
      const { isValid } = req.body

      await this.answerCardUseCase.execute(cardId, studentId, isValid)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

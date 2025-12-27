import { Router } from "express"
import { CardController } from "#controllers/CardController"
import { authMiddleware } from "#middlewares/authMiddleware"
import { validationMiddleware } from "#middlewares/validationMiddleware"
import { CreateCardDTO } from "#dtos/card/CreateCardDTO"
import { AnswerCardDTO } from "#dtos/card/AnswerCardDTO"

const cardRouter = Router()
const cardController = new CardController()

// All card routes require authentication
cardRouter.use(authMiddleware as any)

cardRouter.post(
  "/",
  validationMiddleware(CreateCardDTO),
  (req, res, next) => cardController.create(req as any, res, next),
)

cardRouter.get("/", (req, res, next) =>
  cardController.list(req as any, res, next),
)

cardRouter.get("/quizz", (req, res, next) =>
  cardController.getQuizz(req as any, res, next),
)

cardRouter.patch(
  "/:cardId/answer",
  validationMiddleware(AnswerCardDTO),
  (req, res, next) => cardController.answer(req as any, res, next),
)

export default cardRouter

import { Router } from "express"
import { FlashcardController } from "#controllers/FlashcardController"
import { authMiddleware } from "#middlewares/authMiddleware"
import { validationMiddleware } from "#middlewares/validationMiddleware"
import { CreateFlashcardDTO } from "#dtos/flashcard/CreateFlashcardDTO"
import { UpdateFlashcardDTO } from "#dtos/flashcard/UpdateFlashcardDTO"

const flashcardRouter = Router()
const flashcardController = new FlashcardController()

// All flashcard routes require authentication
flashcardRouter.use(authMiddleware as any)

flashcardRouter.post(
  "/",
  validationMiddleware(CreateFlashcardDTO),
  (req, res, next) => flashcardController.create(req as any, res, next),
)
flashcardRouter.get("/", (req, res, next) =>
  flashcardController.list(req as any, res, next),
)
flashcardRouter.get("/:id", (req, res, next) =>
  flashcardController.getById(req as any, res, next),
)
flashcardRouter.patch(
  "/:id",
  validationMiddleware(UpdateFlashcardDTO),
  (req, res, next) => flashcardController.update(req as any, res, next),
)
flashcardRouter.delete("/:id", (req, res, next) =>
  flashcardController.delete(req as any, res, next),
)

export default flashcardRouter

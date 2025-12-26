import { Router } from "express"
import studentRouter from "#routers/student/student.route"
import flashcardRouter from "#routers/flashcard/flashcard.route"

const router = Router()

router.use("/students", studentRouter)
router.use("/flashcards", flashcardRouter)

export default router

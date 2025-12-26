import { Router } from "express"
import studentRouter from "#routers/student/student.route"
import flashcardRouter from "#routers/flashcard/flashcard.route"
import tagRouter from "#routers/tag/tag.route"

const router = Router()

router.use("/students", studentRouter)
router.use("/flashcards", flashcardRouter)
router.use("/tags", tagRouter)

export default router

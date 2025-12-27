import { Router } from "express"
import studentRouter from "#routers/student/student.route"
import cardRouter from "#routers/card/card.route"

const router = Router()

router.use("/students", studentRouter)
router.use("/cards", cardRouter)

export default router

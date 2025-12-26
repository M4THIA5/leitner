import { Router } from "express"
import { StudentController } from "../../../../adapters/controlleurs/StudentController"
import { authMiddleware } from "../../middlewares/authMiddleware"

const router = Router()
const studentController = new StudentController()

router.post("/register", (req, res, next) =>
  studentController.register(req, res, next),
)

router.post("/login", (req, res, next) =>
  studentController.login(req, res, next),
)

router.get("/profile", authMiddleware, (req, res, next) =>
  studentController.getProfile(req, res, next),
)

export default router

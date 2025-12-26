import { Router } from "express"
import { StudentController } from "../../../../adapters/controlleurs/StudentController"
import { authMiddleware } from "../../middlewares/authMiddleware"

const router = Router()
const studentController = new StudentController()

router.post("/register", (req, res) => studentController.register(req, res))

router.post("/login", (req, res) => studentController.login(req, res))

router.get("/profile", authMiddleware, (req, res) => studentController.getProfile(req, res))

export default router

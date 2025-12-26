import { Router } from "express"
import { TagController } from "#controllers/TagController"
import { authMiddleware } from "#middlewares/authMiddleware"

const tagRouter = Router()
const tagController = new TagController()

tagRouter.get("/", (req, res, next) => tagController.list(req, res, next))
tagRouter.post("/", (req, res, next) => tagController.create(req, res, next))
tagRouter.put("/:id", (req, res, next) => tagController.update(req, res, next))
tagRouter.delete("/:id", (req, res, next) => tagController.delete(req, res, next))

export default tagRouter

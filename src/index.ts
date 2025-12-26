import "./load-env"
import express from "express"
import cors from "cors"
import router from "#routers/router"
import { errorHandle } from "./infrastructure/UI/middlewares/errorHandle"
import { notFoundHandler } from "./infrastructure/UI/middlewares/notFoundHandler"

const app = async () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(cors())
  app.use(express.json())

  app.get("/", (req, res) => {
    res.send("Hello, World!")
  })

  app.use(router)

  app.use(notFoundHandler)

  app.use(errorHandle)

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

app()

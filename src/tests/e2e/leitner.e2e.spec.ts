import { describe, it, expect, beforeAll, afterAll } from "vitest"
import request from "supertest"
import express from "express"
import cors from "cors"
import router from "#routers/router"
import { errorHandle } from "#middlewares/errorHandle"
import { notFoundHandler } from "#middlewares/notFoundHandler"
import prisma from "#db/db"

describe("Leitner System E2E Tests", () => {
  let app: express.Application
  let authToken: string
  let studentId: string
  let cardId: string

  beforeAll(async () => {
    app = express()
    app.use(cors())
    app.use(express.json())
    app.use(router)
    app.use(notFoundHandler)
    app.use(errorHandle)

    await prisma.card.deleteMany({})
    await prisma.student.deleteMany({})
  })

  afterAll(async () => {
    await prisma.card.deleteMany({})
    await prisma.student.deleteMany({})
    await prisma.$disconnect()
  })

  describe("Student Authentication Flow", () => {
    it("should register a new student", async () => {
      const response = await request(app)
        .post("/students/register")
        .send({
          name: "Test Student",
          email: "test@leitner.com",
          password: "Password123!",
        })
        .expect(201)

      expect(response.body).toHaveProperty("id")
      expect(response.body.email).toBe("test@leitner.com")
      expect(response.body.name).toBe("Test Student")
      expect(response.body).not.toHaveProperty("password")

      studentId = response.body.id
    })

    it("should not register a student with duplicate email", async () => {
      await request(app)
        .post("/students/register")
        .send({
          name: "Duplicate Student",
          email: "test@leitner.com",
          password: "Password123!",
        })
        .expect(500)
    })

    it("should login with correct credentials", async () => {
      const response = await request(app)
        .post("/students/login")
        .send({
          email: "test@leitner.com",
          password: "Password123!",
        })
        .expect(200)

      expect(response.body).toHaveProperty("token")
      expect(response.body.user.email).toBe("test@leitner.com")

      authToken = response.body.token
    })

    it("should not login with incorrect password", async () => {
      await request(app)
        .post("/students/login")
        .send({
          email: "test@leitner.com",
          password: "WrongPassword",
        })
        .expect(500)
    })

    it("should get student profile with valid token", async () => {
      const response = await request(app)
        .get("/students/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.email).toBe("test@leitner.com")
      expect(response.body.name).toBe("Test Student")
    })

    it("should not get profile without token", async () => {
      await request(app)
        .get("/students/profile")
        .expect(401)
    })
  })

  describe("Card Management Flow", () => {
    it("should create a new card", async () => {
      const response = await request(app)
        .post("/cards")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          question: "What is the Leitner system?",
          answer: "A spaced repetition learning technique using flashcards",
          tag: "Learning",
        })
        .expect(201)

      expect(response.body).toHaveProperty("id")
      expect(response.body.question).toBe("What is the Leitner system?")
      expect(response.body.category).toBe("FIRST")

      cardId = response.body.id
    })

    it("should not create card without authentication", async () => {
      await request(app)
        .post("/cards")
        .send({
          question: "Test question",
          answer: "Test answer",
        })
        .expect(401)
    })

    it("should list all cards for the student", async () => {
      await request(app)
        .post("/cards")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          question: "Second question",
          answer: "Second answer",
          tag: "Test",
        })

      const response = await request(app)
        .get("/cards")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThanOrEqual(2)
    })

    it("should filter cards by tags", async () => {
      const response = await request(app)
        .get("/cards?tags=Learning")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.every((card: any) => card.tag === "Learning")).toBe(true)
    })
  })

  describe("Quiz and Answer Flow", () => {
    it("should get quiz cards", async () => {
      const response = await request(app)
        .get("/cards/quizz")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it("should answer a card correctly and progress category", async () => {
      await request(app)
        .patch(`/cards/${cardId}/answer`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ isValid: true })
        .expect(204)

      const response = await request(app)
        .get("/cards")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      const answeredCard = response.body.find((c: any) => c.id === cardId)
      expect(answeredCard.category).toBe("SECOND")
    })

    it("should answer a card incorrectly and reset to FIRST", async () => {
      await request(app)
        .patch(`/cards/${cardId}/answer`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ isValid: false })
        .expect(204)

      const response = await request(app)
        .get("/cards")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      const answeredCard = response.body.find((c: any) => c.id === cardId)
      expect(answeredCard.category).toBe("FIRST")
    })

    it("should progress card through all categories to DONE", async () => {
      const categories = ["SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "DONE"]

      for (const expectedCategory of categories) {
        await request(app)
          .patch(`/cards/${cardId}/answer`)
          .set("Authorization", `Bearer ${authToken}`)
          .send({ isValid: true })
          .expect(204)

        const response = await request(app)
          .get("/cards")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200)

        const card = response.body.find((c: any) => c.id === cardId)
        expect(card.category).toBe(expectedCategory)
      }
    })

    it("should not include DONE cards in quiz", async () => {
      const response = await request(app)
        .get("/cards/quizz")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200)

      const doneCard = response.body.find((c: any) => c.id === cardId)
      expect(doneCard).toBeUndefined()
    })
  })

  describe("Authorization Tests", () => {
    it("should not allow answering another student's card", async () => {
      const newStudentResponse = await request(app)
        .post("/students/register")
        .send({
          name: "Another Student",
          email: "another@leitner.com",
          password: "Password123!",
        })

      const loginResponse = await request(app)
        .post("/students/login")
        .send({
          email: "another@leitner.com",
          password: "Password123!",
        })

      const anotherToken = loginResponse.body.token

      await request(app)
        .patch(`/cards/${cardId}/answer`)
        .set("Authorization", `Bearer ${anotherToken}`)
        .send({ isValid: true })
        .expect(500)
    })
  })
})

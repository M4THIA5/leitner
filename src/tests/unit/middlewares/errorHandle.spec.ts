import { describe, it, expect, vi } from "vitest"
import { errorHandle } from "../../../infrastructure/UI/middlewares/errorHandle"
import { Request, Response, NextFunction } from "express"

describe("errorHandle Middleware", () => {
  it("should return 500 and default message if error has no status or message", () => {
    const error = {}
    const req = {} as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandle(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 500,
        message: "Internal Server Error",
      }),
    )
  })

  it("should return custom status and message from error object", () => {
    const error = { status: 400, message: "Bad Request" }
    const req = {} as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandle(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        message: "Bad Request",
      }),
    )
  })

  it("should include stack trace in development mode", () => {
    process.env.NODE_ENV = "development"
    const error = new Error("Test Error")
    const req = {} as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandle(error, req, res, next)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        stack: expect.any(String),
      }),
    )
  })

  it("should not include stack trace in production mode", () => {
    process.env.NODE_ENV = "production"
    const error = new Error("Test Error")
    const req = {} as Request
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandle(error, req, res, next)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        stack: undefined,
      }),
    )
    // Reset NODE_ENV to avoid side effects
    process.env.NODE_ENV = "development"
  })
})

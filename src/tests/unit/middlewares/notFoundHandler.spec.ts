import { describe, it, expect, vi } from "vitest"
import { notFoundHandler } from "#middlewares/notFoundHandler"
import { Request, Response, NextFunction } from "express"

describe("notFoundHandler Middleware", () => {
  it("should call next with a 404 error", () => {
    const req = { originalUrl: "/test-url" } as Request
    const res = {} as Response
    const next = vi.fn() as NextFunction

    notFoundHandler(req, res, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
    const error = (next as any).mock.calls[0][0]
    expect(error.message).toBe("Not Found - /test-url")
    expect(error.status).toBe(404)
  })
})

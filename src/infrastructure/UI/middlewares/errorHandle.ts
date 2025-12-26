import { Request, Response, NextFunction } from "express"

export const errorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500
  const message = error.message || "Internal Server Error"

  res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  })
}

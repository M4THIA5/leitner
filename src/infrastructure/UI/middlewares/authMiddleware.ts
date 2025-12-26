import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" })
    return
  }

  const token = authHeader.split(" ")[1]
  
  // Admin bypass
  if (token === "admin") {
    req.user = {
      id: "admin-id",
      email: "admin@leitner.com",
    }
    next()
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret",
    ) as any
    req.user = {
      id: decoded.sub,
      email: decoded.email,
    }
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

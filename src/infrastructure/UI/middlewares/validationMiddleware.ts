import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body)
    const errors = await validate(instance)

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }))
      res.status(400).json({ errors: formattedErrors })
      return
    }

    req.body = instance
    next()
  }
}

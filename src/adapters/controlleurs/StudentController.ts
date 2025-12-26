import { Request, Response, NextFunction } from "express"
import { RegisterStudent } from "../../application/use-cases/RegisterStudent"
import { LoginStudent } from "../../application/use-cases/LoginStudent"
import { GetStudentById } from "../../application/use-cases/GetStudentById"
import { StudentRepository } from "../repositories/StudentRepository"
import { StudentMapper } from "../mappers/StudentMapper"
import { AuthRequest } from "../../infrastructure/UI/middlewares/authMiddleware"

export class StudentController {
  private registerStudentUseCase: RegisterStudent
  private loginStudentUseCase: LoginStudent
  private getStudentByIdUseCase: GetStudentById

  constructor() {
    const studentRepository = new StudentRepository()
    this.registerStudentUseCase = new RegisterStudent(studentRepository)
    this.loginStudentUseCase = new LoginStudent(studentRepository)
    this.getStudentByIdUseCase = new GetStudentById(studentRepository)
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password } = req.body
      const student = await this.registerStudentUseCase.execute({
        name,
        email,
        password,
      })
      res.status(201).json(StudentMapper.toResponse(student))
    } catch (error: any) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body
      const { student, token } = await this.loginStudentUseCase.execute({
        email,
        password,
      })
      res.status(200).json({
        user: StudentMapper.toResponse(student),
        token,
      })
    } catch (error: any) {
      next(error)
    }
  }

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const studentId = req.user?.id
      if (!studentId) {
        throw new Error("Unauthorized")
      }

      const student = await this.getStudentByIdUseCase.execute(studentId)
      res.status(200).json(StudentMapper.toResponse(student))
    } catch (error: any) {
      next(error)
    }
  }
}

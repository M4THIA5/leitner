import { Flashcard } from "#entities/Flashcard"

export interface IFlashcardRepository {
  save(flashcard: Flashcard): Promise<void>
  findById(id: string): Promise<Flashcard | null>
  findByStudentId(studentId: string): Promise<Flashcard[]>
  update(flashcard: Flashcard): Promise<void>
  delete(id: string): Promise<void>
}

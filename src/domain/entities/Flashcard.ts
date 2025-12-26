export class Flashcard {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly answer: string,
    public readonly studentId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly tags: string[] = [],
  ) {}

  static create(props: {
    id: string
    question: string
    answer: string
    studentId: string
    createdAt: Date
    updatedAt: Date
    tags?: string[]
  }): Flashcard {
    return new Flashcard(
      props.id,
      props.question,
      props.answer,
      props.studentId,
      props.createdAt,
      props.updatedAt,
      props.tags || [],
    )
  }
}

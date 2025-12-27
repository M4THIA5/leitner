import { Category } from "./Category"

export class Card {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly answer: string,
    public readonly category: Category,
    public readonly studentId: string,
    public readonly tag?: string,
    public readonly lastAnsweredAt?: Date,
  ) {}

  static create(props: {
    id: string
    question: string
    answer: string
    category?: Category
    studentId: string
    tag?: string
    lastAnsweredAt?: Date
  }): Card {
    return new Card(
      props.id,
      props.question,
      props.answer,
      props.category || Category.FIRST,
      props.studentId,
      props.tag,
      props.lastAnsweredAt,
    )
  }
}

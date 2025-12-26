export class Student {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
  }): Student {
    return new Student(
      props.id,
      props.name,
      props.email,
      props.password,
      props.createdAt,
      props.updatedAt,
    )
  }
}

export class Tag {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
  }): Tag {
    return new Tag(
      props.id,
      props.name,
      props.createdAt,
      props.updatedAt,
    )
  }
}

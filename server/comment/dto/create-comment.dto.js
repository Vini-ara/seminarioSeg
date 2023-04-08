export class CreateCommentDto {
  constructor(body) {
    this.title = body.title
    this.content = body.content
    this.userId = body.userId
  }

  static fromRequest(body) {
    const createCommentDto = new CreateCommentDto(body);

    for (const key in createCommentDto)
      if (!createCommentDto[key]) throw new Error(`Missing field: ${key}`);

    for (const key in body)
      if (!createCommentDto[key]) throw new Error(`Invalid field: ${key}`);

    return createCommentDto;
  }
}

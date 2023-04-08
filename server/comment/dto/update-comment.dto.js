export class UpdateCommentDto {
  constructor(body) {
    this.title = body.title
    this.content = body.content
  }

  static fromRequest(body) {
    const updateCommentDto = new UpdateCommentDto(body);

    for (const key in body)
      if (!updateCommentDto[key]) throw new Error(`Invalid field: ${key}`);

    return updateCommentDto;
  }
}

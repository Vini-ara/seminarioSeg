export class CreatePostDto {
  constructor(body) {
    this.title = body.title
    this.content = body.content
    this.userId = body.userId
  }

  static fromRequest(body) {
    const createPostDto = new CreatePostDto(body);

    for (const key in createPostDto)
      if (!createPostDto[key]) throw new Error(`Missing field: ${key}`);

    for (const key in body)
      if (!createPostDto[key]) throw new Error(`Invalid field: ${key}`);

    return createPostDto;
  }
}

export class UpdateUserDto {
  constructor(body) {
    this.email = body.email;
    this.username = body.username;
    this.password = body.password;
    this.name = body.name;
    this.image = body.image;
  }

  static fromRequest(body) {
    const updateUserDto = new UpdateUserDto(body);

    for (const key in body)
      if (!updateUserDto[key])
        throw new Error(`Invalid field: ${key}`);

    return updateUserDto;
  }
}

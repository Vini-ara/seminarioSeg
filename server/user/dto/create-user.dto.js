export class CreateUserDto {
  constructor(body) {
    this.email = body.email;
    this.username = body.username;
    this.password = body.password;
    this.name = body.name;
    this.gender = body.gender;
    this.cargoId = body.cargoId;
    this.image = body.image;
  }

  static fromRequest(body) {
    const createUserDto = new CreateUserDto(body);

    for (const key in createUserDto)
      if (!createUserDto[key])
        throw new Error(`Missing field: ${key}`);  

    for (const key in body)
      if (!createUserDto[key])
        throw new Error(`Invalid field: ${key}`);

    return createUserDto;
  }
}

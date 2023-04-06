export class UserService {
  create(createUserDto) {
    return `This action adds a new user`
  }
  findAll() {
    return `This action returns all user`
  }
  findOne(id) {
    return `This action returns the user ${id}`
  }
  update(id, updateUserDto) {
    return `This action updates the user ${id}`
  }
  remove(id) {
    return `This action removes the user ${id}`
  }
}

export class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(createUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id, updateUserDto) {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }
}

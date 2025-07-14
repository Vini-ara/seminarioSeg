import bcrypt from 'bcrypt';

const defaultSelect = {
  id: true, 
  username: true,
  image: true,
  email: true,
  gender: true,
  posts: true
}

export class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(createUserDto) {
    const password = bcrypt.hashSync(createUserDto.password, 10);

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        gender: '',
        password,
      },
      select: defaultSelect,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: defaultSelect
    });
  }

  async findOne(id) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: defaultSelect,
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
    });
  }
}

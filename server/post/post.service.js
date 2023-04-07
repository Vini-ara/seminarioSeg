export class PostService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(createPostDto) {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id) {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  async update(id, updatePostDto) {
    return await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  async remove(id) {
    return await this.prisma.post.delete({
      where: { id },
    });
  }
}

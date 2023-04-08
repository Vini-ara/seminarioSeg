export class CommentService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(createCommentDto) {
    return await this.prisma.comment.create({
      data: createCommentDto,
    });
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findOne(id) {
    return await this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id, updateCommentDto) {
    return await this.prisma.comment.update({
      data: updateCommentDto,
      where: { id },
    });
  }

  async remove(id) {
    return await this.prisma.comment.delete({
      where: { id },
    });
  }
}

const defaultPostSelect = {
  id: true,
  content: true,
  updatedAt: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      email: true,
      username: true,
      image: true,
    },
  },
};

export class PostService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(createPostDto) {
    return await this.prisma.post.create({
      data: createPostDto,
      select: defaultPostSelect,
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      select: defaultPostSelect,
    });
  }

  async findOne(id) {
    return await this.prisma.post.findUnique({
      where: { id },
      select: {
        ...defaultPostSelect,
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              }
            }
          }
        }
      },
    });
  }

  async update(id, updatePostDto) {
    return await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
      select: defaultPostSelect,
    });
  }

  async remove(id, user) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== user.id) {
      throw new Error("You can only delete your own posts.");
    }

    return await this.prisma.post.delete({
      where: { id },
      select: defaultPostSelect,
    });
  }
}

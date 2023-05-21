import jwt from "jsonwebtoken";

const defaultUserSelect = {
  id: true,
  email: true,
  username: true,
  gender: true,
  image: true,
  isAdmin: true,
  createdAt: true,
  cargo: {
    select: {
      id: true,
      nome: true,
      nucleo: true,
    },
  },
};

export class AuthService {
  constructor(prisma) {
    this.prismaService = prisma;
  }

  async refreshAuth(id) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: defaultUserSelect,
    });

    const payload = {
      id: user.id,
      nome: user.username,
      is_admin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2 days",
    });

    return {
      accessToken,
      expiresIn: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 2, // daqui a dois dias
      user,
    };
  }

  async generateAccessToken(email, password) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user?.password != password || !user) {
      throw new Error("usuario ou senha invalidos");
    }

    const payload = {
      id: user.id,
      nome: user.username,
      is_admin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2 days",
    });

    const { _password, ...userWithoutPassword } = user;

    return {
      accessToken,
      expiresIn: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 2, // daqui a dois dias
      userWithoutPassword,
    };
  }
}

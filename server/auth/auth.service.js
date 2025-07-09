import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const defaultUserSelect = {
  id: true,
  email: true,
  username: true,
  gender: true,
  image: true,
  isAdmin: true,
  createdAt: true,
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

    const accessToken = jwt.sign(payload, process.env.JWT_AT_SECRET_KEY, {
      expiresIn: parseInt(process.env.JWT_AT_EXPIRES_IN),
    });

    return {
      accessToken,
      expiresIn: new Date().setTime(
        new Date().getTime() +
          parseInt(process.env.JWT_AT_EXPIRES_IN) * 1000,
      ),
      user,
    };
  }

  async generateAccessToken(email, password) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("usuario ou senha invalidos");
    }

    if (bcrypt.compareSync(password, user.password) === false) {
      console.error("senha invalida");
      throw new Error("usuario ou senha invalidos");
    }

    const payload = {
      id: user.id,
      nome: user.username,
      is_admin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_AT_SECRET_KEY, {
      expiresIn: process.env.JWT_AT_EXPIRES_IN,
    });

    const { _password, ...userWithoutPassword } = user;

    return {
      accessToken,
      expiresIn: new Date().setTime(
        new Date().getTime() +
          parseInt(process.env.JWT_AT_EXPIRES_IN) * 1000,
      ),
      userWithoutPassword,
    };
  }
}

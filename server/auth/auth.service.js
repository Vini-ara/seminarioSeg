import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CookieUtils } from "../utils/cookie.utils.js";

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

  async refreshAuth(req, response) {
    const cookieRefreshToken = CookieUtils.getCookieValue(req, 'refreshToken');

    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: req.user.id },
      select: {
        ...defaultUserSelect,
        refreshToken: true,
      },
    });

    const { refreshToken, ...userData } = user;

    if (!cookieRefreshToken || cookieRefreshToken !== refreshToken) {
      return null;
    }

    await this.generateTokens(userData, response);

    return {
      user: userData,
    };
  }

  async logout(id, response) {
    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });

    CookieUtils.clearCookie(response, 'accessToken');
    CookieUtils.clearCookie(response, 'refreshToken');

    return { message: "Logout successful" };
  }

  async getUserData(id) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: defaultUserSelect,
    });

    return user;
  }

  async logout(id, response) {
    CookieUtils.clearCookie(response, 'accessToken');
    CookieUtils.clearCookie(response, 'refreshToken');

    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });

    return { message: "Logout successful" };
  }

  async generateTokens(user, response) {
    const payload = {
      id: user.id,
      nome: user.username,
      is_admin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_AT_PRIVATE_KEY, {
      expiresIn: parseInt(process.env.JWT_AT_EXPIRES_IN),
      algorithm: 'PS256',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_RT_PRIVATE_KEY, {
      expiresIn: parseInt(process.env.JWT_RT_EXPIRES_IN),
      algorithm: 'PS256',
    });

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });


    CookieUtils.setHeaderWithCookie(response, {
      accessToken,
    }, parseInt(process.env.JWT_AT_EXPIRES_IN));
    CookieUtils.setHeaderWithCookie(response, {
      refreshToken,
    }, parseInt(process.env.JWT_RT_EXPIRES_IN));
  }


  async login(email, password, response) {
    console.log("Login attempt for email:", email);
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

    await this.generateTokens(user, response);


    const { _password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
    };
  }
}

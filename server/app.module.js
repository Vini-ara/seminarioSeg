import express from "express";
import { PrismaClient } from "@prisma/client";
import { UserModule } from "./user/user.module.js";
import { PostModule } from "./post/post.module.js";
import { CommentModule } from "./comment/comment.module.js";
import errorHandler from "./middlewares/error-handler.js";
import { AuthModule } from "./auth/auth.module.js";

export class AppModule {
  basePath = "/api";

  constructor() {
    const prisma = new PrismaClient();
    this.userModule = new UserModule(prisma);
    this.postModule = new PostModule(prisma);
    this.commentModule = new CommentModule(prisma);
    this.authModule = new AuthModule(prisma);
    this.router = express
      .Router()
      .use(this.basePath, this.userModule.router)
      .use(this.basePath, this.postModule.router)
      .use(this.basePath, this.commentModule.router)
      .use(this.basePath, this.authModule.router)
      .use(errorHandler);
  }
}

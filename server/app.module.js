import express from "express";
import { PrismaClient } from "@prisma/client";
import { UserModule } from "./user/user.module.js";
import { PostModule } from "./post/post.module.js";
import errorHandler from "./middlewares/error-handler.js";

export class AppModule {
  constructor() {
    const prisma = new PrismaClient();
    this.userModule = new UserModule(prisma);
    this.postModule = new PostModule(prisma);
    this.router = express
      .Router()
      .use(this.userModule.router)
      .use(this.postModule.router)
      .use(errorHandler);
  }
}

import express from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

export class UserModule {
  constructor(prisma) {
    this.userService = new UserService(prisma);
    this.userController = new UserController(this.userService);
    this.router = express
      .Router()
      .use(this.userController.basePath, this.userController.router);
  }
}

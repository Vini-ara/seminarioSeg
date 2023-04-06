import express from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

export class UserModule {
  constructor() {
    const userService = new UserService();
    const userController = new UserController(userService);
    this.router = express
      .Router()
      .use(userController.basePath, userController.router);
  }
}

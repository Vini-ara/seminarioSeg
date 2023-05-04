import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

export class AuthModule {
  constructor(prisma) {
    this.authService = new AuthService(prisma)
    this.authController = new AuthController(this.authService)
    this.router = express
      .Router()
      .use(this.authController.basePath, this.authController.router);
  }
}

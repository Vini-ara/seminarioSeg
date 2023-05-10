import express from "express";
import authorization from "../middlewares/authorization.js";

export class AuthController {
  basePath = "/auth";

  constructor(authService) {
    this.authService = authService;
    this.router = express.Router();
    this.router.post("/login", this.login.bind(this));
    this.router.get("/refresh", authorization, this.refresh.bind(this));
  }

  async login(req, res, next) {
    try {
      const response = await this.authService.generateAccessToken(
        req.body.email,
        req.body.password
      );

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const response = await this.authService.refreshAuth(req.user.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

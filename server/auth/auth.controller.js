import express from "express";
import authorization from "../middlewares/authorization.js";
import refreshAuth from "../middlewares/refreshAuth.js";

export class AuthController {
  basePath = "/auth";

  constructor(authService) {
    this.authService = authService;
    this.router = express.Router();
    this.router.post("/login", this.login.bind(this));
    this.router.get("/refresh", refreshAuth,this.refresh.bind(this));
    this.router.get("/logout", authorization, this.logout.bind(this));
    this.router.get("/isLogged", authorization, this.isLoggedIn.bind(this));
  }

  async login(req, res, next) {
    try {
      const response = await this.authService.generateAccessToken(
        req.body.email,
        req.body.password,
        res
      );

      res.status(200).json(response);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  async isLoggedIn(req, res, next) {
    try {
      if (!req.user) {
        return res.status(200).json({
          isLoggedIn: false,
          user: null,
        });
      }
      
      const userData = await this.authService.getUserData(req.user.id);
      
      res.status(200).json({
        isLoggedIn: true,
        user: userData,
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const response = await this.authService.logout(req.user.id, res);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const response = await this.authService.refreshAuth(req, res);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

import express from "express";
import authorization from "../middlewares/authorization.js";
import refreshAuth from "../middlewares/refreshAuth.js";
import { CookieUtils } from "../utils/cookie.utils.js";

import jwt from "jsonwebtoken";

export class AuthController {
  basePath = "/auth";

  constructor(authService) {
    this.authService = authService;
    this.router = express.Router();
    this.router.post("/login", this.login.bind(this));
    this.router.get("/refresh", refreshAuth,this.refresh.bind(this));
    this.router.post("/logout", authorization, this.logout.bind(this));
    this.router.get("/isLogged", this.isLoggedIn.bind(this));
  }

  async login(req, res, next) {
    try {
      console.log("Login attempt with email:", req.body.email);
      const response = await this.authService.login(
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
      let decoded = null;

      const refreshToken = CookieUtils.getCookieValue(req, "refreshToken") || null;

      decoded = jwt.verify(refreshToken, process.env.JWT_RT_PUBLIC_KEY, { algorithms: ['PS256'] });

      req.user = decoded;

      const userData = await this.authService.refreshAuth(req, res);
      
      if (!userData) {
        return res.status(401).json({ isLoggedIn: false, message: "Not authorized get Resource" });
      }

      res.status(200).json({
        isLoggedIn: true,
        user: userData.user,
      });
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({ isLoggedIn: false, message: "Not authorized get Resource" });
      }

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

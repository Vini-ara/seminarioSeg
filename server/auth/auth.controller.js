import express from "express";

export class AuthController {
  basePath = "auth"  

  constructor(authService) {
    this.authService = authService;
    this.router = express.Router();
    this.router.post('/login', this.login.bind(this))
  }

  login(req, res, next) {
    try {
      const accessToken = this.authService.generateAcessToken(req.user.id, req.user.name, req.user.is_admin)
      res.status(200).json(accessToken)
    } catch (err) {
      next(err)
    }
  }
}

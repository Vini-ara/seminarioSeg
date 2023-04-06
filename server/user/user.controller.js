import express from "express";

export class UserController {
  #basePath = "/user";

  constructor(userService) {
    this.userService = userService;
    this.router = express.Router();
    this.router.post(`${this.#basePath}/`, this.create.bind(this));
    this.router.get(`${this.#basePath}/`, this.findAll.bind(this));
    this.router.get(`${this.#basePath}/:id`, this.findOne.bind(this));
    this.router.put(`${this.#basePath}/:id`, this.update.bind(this));
    this.router.delete(`${this.#basePath}/:id`, this.delete.bind(this));
  }

  create(req, res) {
    res.json(this.userService.create(req.body));
  }

  findAll(req, res) {
    res.json(this.userService.findAll());
  }

  findOne(req, res) {
    res.json(this.userService.findOne(req.params.id));
  }

  update(req, res) {
    res.json(this.userService.update(req.params.id));
  }

  delete(req, res) {
    res.json(this.userService.delete(req.params.id));
  }
}

import express from "express";

export class UserController {
  basePath = "/user";

  constructor(userService) {
    this.userService = userService;
    this.router = express.Router();
    this.router.post("/", this.create.bind(this));
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }

  async create(req, res) {
    const user = await this.userService.create(req.body)

    res.status(201).json(user);
  }

  async findAll(req, res) {
    const users = await this.userService.findAll()
    res.json(users);
  }

  async findOne(req, res) {
    const user = await this.userService.findOne(req.params.id)
    res.json(user);
  }

  async update(req, res) {
    const user = await this.userService.update(req.params.id)
    res.json(user);
  }

  async delete(req, res) {
    const user = await this.userService.delete(req.params.id)
    res.json(user);
  }
}

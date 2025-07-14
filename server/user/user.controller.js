import express from "express";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

export class UserController {
  basePath = "/user";

  constructor(userService) {
    this.userService = userService;
    this.router = express.Router();
    this.router.post("/", this.create.bind(this));
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.remove.bind(this));
  }

  async create(req, res, next) {
    try {
      const createUserDto = CreateUserDto.fromRequest(req.body);
      const user = await this.userService.create(createUserDto);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updateUserDto = UpdateUserDto.fromRequest(req.body);
      const authUser = req.user;

      if (authUser.id !== req.params.id) {
        throw new Error("You can only update your own profile.");
      }

      const user = await this.userService.update(req.params.id, updateUserDto);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const authUser = req.user;

      if (authUser.id !== req.params.id) {
        throw new Error("You can only delete your own profile.");
      }

      const user = await this.userService.remove(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

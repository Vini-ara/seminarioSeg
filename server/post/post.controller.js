import express from "express";
import { CreatePostDto } from "./dto/create-post.dto.js";
import { UpdatePostDto } from "./dto/update-post.dto.js";

export class PostController {
  basePath = "/post";

  constructor(postService) {
    this.postService = postService;
    this.router = express.Router();
    this.router.post("/", this.create.bind(this));
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.remove.bind(this));
  }

  async create(req, res, next) {
    try {
      const createPostDto = CreatePostDto.fromRequest(req.body);
      const post = await this.postService.create(createPostDto);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const posts = await this.postService.findAll();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      const post = await this.postService.findOne(+req.params.id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updatePostDto = UpdatePostDto.fromRequest(req.body);
      const post = await this.postService.update(+req.params.id, updatePostDto);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const post = await this.postService.remove(+req.params.id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
}

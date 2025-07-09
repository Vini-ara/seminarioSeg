import express from "express";
import { CreateCommentDto } from "./dto/create-comment.dto.js";
import { UpdateCommentDto } from "./dto/update-comment.dto.js";

import authorization from "../middlewares/authorization.js";

export class CommentController {
  basePath = "/comment";

  constructor(commentService) {
    this.commentService = commentService;
    this.router = express.Router();
    this.router.post("/", authorization, this.create.bind(this));
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.put("/:id", authorization, this.update.bind(this));
    this.router.delete("/:id", authorization, this.remove.bind(this));
  }

  async create(req, res, next) {
    try {
      const createCommentDto = CreateCommentDto.fromRequest(req.body);
      const post = await this.commentService.create(createCommentDto);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  async findAll(_, res, next) {
    try {
      const posts = await this.commentService.findAll();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      const post = await this.commentService.findOne(req.params.id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updateCommentDto = UpdateCommentDto.fromRequest(req.body);
      const post = await this.commentService.update(req.params.id, updateCommentDto);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const post = await this.commentService.remove(req.params.id);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
}

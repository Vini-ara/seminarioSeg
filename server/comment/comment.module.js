import express from "express";
import { CommentController } from "./comment.controller.js";
import { CommentService } from "./comment.service.js";

export class CommentModule {
  constructor(prisma) {
    this.commentService = new CommentService(prisma);
    this.commentController = new CommentController(this.commentService);
    this.router = express
      .Router()
      .use(this.commentController.basePath, this.commentController.router);
  }
}

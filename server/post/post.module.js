import express from "express";
import { PostController } from "./post.controller.js";
import { PostService } from "./post.service.js";

export class PostModule {
  constructor(prisma) {
    this.postService = new PostService(prisma);
    this.postController = new PostController(this.postService);
    this.router = express
      .Router()
      .use(this.postController.basePath, this.postController.router);
  }
}

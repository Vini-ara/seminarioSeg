import express from 'express';
import { PrismaClient } from '@prisma/client';
import { UserModule } from './user/user.module.js';

export class AppModule {
  constructor() {
    const prisma = new PrismaClient()
    this.userModule = new UserModule(prisma)
    this.router = express.Router()
      .use(this.userModule.router)
  }
}
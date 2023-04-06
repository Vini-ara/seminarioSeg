import express from 'express';
import { UserModule } from './user/user.module.js';

export class AppModule {
  constructor() {
    const userModule = new UserModule()
    this.router = express.Router()
      .use(userModule.router)
  }
}
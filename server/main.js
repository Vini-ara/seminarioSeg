import express from "express";
import { AppModule } from "./app.module.js";

const app = express();
app.use(express.json());
app.use(new AppModule().router)
app.listen(3000)
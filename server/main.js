import * as dotenv from 'dotenv';
dotenv.config()

import express from "express";
import { AppModule } from "./app.module.js";

const app = express();
app.use(express.json());
app.use(new AppModule().router);

app.use(express.static("public"));
app.listen(3000, () => console.log("server runing on port 30000"));

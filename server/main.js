import * as dotenv from 'dotenv';
import https from 'https';
import express from "express";
import { AppModule } from "./app.module.js";

dotenv.config()

const app = express();
app.use(express.json());
app.use(new AppModule().router);

let redirect = express.Router().get("/", (_, res) => res.redirect("/login"))

app.use(redirect)

app.use(express.static("public"));

const server = https.createServer({
  key: process.env.SSL_KEY,
  cert: process.env.SSL_CERT,
}, app);

server.listen(3000, () => console.log("server runing on port 30000"));

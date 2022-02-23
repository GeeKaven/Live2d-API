"use strict";

// 读取 .env 文件
import * as dotenv from "dotenv";
dotenv.config();

// 引入 Fastify 框架
import Fastify from "fastify";

// 实例化 Fastify
const app = Fastify({
  logger: true,
});

// 将应用注册为一个常规插件
app.register(import("../app.js"));

export default async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
}
/**
 * @file index.ts
 * @description - server initialization
 * @author Chris Van
 * @contact chrisvan.vshmr@gmail.com
 * @license
 * @copyright
 */

/**
 * * Imports
 */
import "reflect-metadata";

import { Application } from "express";
import { createExpressServer } from "routing-controllers";

import { initDb } from "./database";

import path from "path";

/**
 * * Initialize database defaults
 */
initDb();

/**
 * * Creating express server instance
 */
const server: Application = createExpressServer({
  controllers: [path.join(__dirname, "/controllers/**/*.controller.{ts,js}")],
  cors: true,
});

/**
 * * Starting server
 */
server.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});

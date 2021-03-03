/**
 * @file index.ts
 * @description - database related
 * @author Chris Van
 * @contact chrisvan.vshmr@gmail.com
 * @license
 * @copyright
 */

/**
 * * Imports
 */
import low from "lowdb";
import FileAsync from "lowdb/adapters/FileSync";

import { GeneratedSecret } from "speakeasy";

/**
 * * User Interface
 */
interface User {
  id: string;
  secret: GeneratedSecret;
}

/**
 * * Database Schema Interface
 */
interface Database {
  users: Array<User>;
}

/**
 * * Creating database
 */
const adapter = new FileAsync<Database>("db.json");

/**
 * * Initialize database instance
 */
const db = low(adapter);

export const initDb = () => {
  db.defaults({ users: [] }).write();
};

export default db;

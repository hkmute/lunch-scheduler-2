import path from "path";
import { DataSource } from "typeorm";
import CONFIG, { isProduction } from "../config";
import { SnakeNamingStrategy } from "./namingStrategy";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  // dropSchema: !isProduction,
  synchronize: !isProduction,
  logging: isProduction ? ["error", "warn"] : true,
  entities: [path.join(__dirname, "entity/*")],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
});

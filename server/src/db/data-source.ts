import path from "path";
import { DataSource } from "typeorm";
import CONFIG, { isProduction } from "../config";
import { SnakeNamingStrategy } from "./namingStrategy";

const initAppDataSource = (config: typeof CONFIG) =>
  new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    // dropSchema: !isProduction,
    // synchronize: !isProduction,
    logging: isProduction ? ["error", "warn"] : true,
    entities: [path.join(__dirname, "entity/*")],
    subscribers: [],
    migrations: [path.join(__dirname, "migrations/*")],
    migrationsRun: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

export const AppDataSource = initAppDataSource(CONFIG);

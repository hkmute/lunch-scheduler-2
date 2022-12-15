import { DataSource } from "typeorm";

const initializeDB = async (AppDataSource: DataSource) => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

export default initializeDB;

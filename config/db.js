import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();
const db = new Sequelize("backend_intra", "root", process.env.MYSQLPASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

export default db;

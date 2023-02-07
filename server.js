import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from "./config/db.js";
import routes from "./routes/routes.js";

dotenv.config();
db.sync()
  .then(console.log("Connected to database"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `App listening at http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`
  );
});

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

console.log(process.env.PORT);
export default {
  port: process.env.PORT,
  // node_env: process.env.NODE_ENV,
  database: process.env.BD_URL,
  // BCRYT_SALT_ROUND: process.env.BCRYT_SALT_ROUND,
  // default_password: process.env.DEFULT_PASSWORLD,
};

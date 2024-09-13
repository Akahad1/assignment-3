import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

console.log(process.env.PORT);
export default {
  port: process.env.PORT,
  node_env: process.env.node_env,
  database: process.env.BD_URL,
  // BCRYT_SALT_ROUND: process.env.BCRYT_SALT_ROUND,
  jwt_secret: process.env.JWT_ACCEESS_SECRET,
  JWT_REFRSH_SECRET: process.env.JWT_REFRSH_SECRET,
  JWT_ACCEESS_TOKEN_EXPIRE: process.env.JWT_ACCEESS_TOKEN_EXPIRE,
};

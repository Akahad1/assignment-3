import express, { Application, Request, Response, Router } from "express";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
// app.use("/api");
export default app;

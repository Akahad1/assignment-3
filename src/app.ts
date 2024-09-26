import express, { Application, Request, Response, Router } from "express";
import cors from "cors";
import router from "./app/router/router";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api", router);
app.use(notFound);
export default app;

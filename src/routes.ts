import { Express, Response } from "express";
import { validate } from "./middleware";
import { createUserHandler } from "./controllers";
import { createUserSchema } from "./schemas";

export default function routes(app: Express) {
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/user", validate(createUserSchema), createUserHandler);
}

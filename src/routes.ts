import { Express, Response } from "express";
import {  requireUser, validate } from "./middleware";
import { createUserHandler, createUserSession, deleteSessionHandler, getUserSessionsHandler } from "./controllers";
import { createUserSchema, createUserSessionSchema } from "./schemas";

export default function routes(app: Express) {
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  
  app.post("/api/user", validate(createUserSchema), createUserHandler);
  app.post("/api/session", validate(createUserSessionSchema), createUserSession);

  app.get('/api/session' ,requireUser, getUserSessionsHandler);
  app.delete('/api/session', requireUser, deleteSessionHandler);

}

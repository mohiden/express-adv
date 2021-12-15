import { Express, Response } from "express";
import {  requireUser, validate } from "./middleware";
import { createUserHandler, createUserSession, deleteProductHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers";
import { createUserSchema, createUserSessionSchema, findProductSchema, createProductSchema, updateProductSchema, deleteProductSchema } from "./schemas";
import { findProductHandler, updateProductHandler, createProductHandler } from "./controllers";

export default function routes(app: Express) {
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  
  app.post("/api/user", validate(createUserSchema), createUserHandler);
  app.post("/api/session", validate(createUserSessionSchema), createUserSession);

  app.get('/api/session' ,requireUser, getUserSessionsHandler);
  app.delete('/api/session', requireUser, deleteSessionHandler);

  app.post('/api/product',[validate(createProductSchema), requireUser], createProductHandler);
  app.get('/api/product/:productId',validate(findProductSchema), findProductHandler);
  app.put('/api/product/:productId',[validate(updateProductSchema), requireUser], updateProductHandler);
  app.delete('/api/product/:productId',[validate(deleteProductSchema), requireUser], deleteProductHandler);
}

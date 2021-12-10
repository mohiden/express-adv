import { Request, Response } from "express";
import { createUserInput } from "../schemas";
import { createUser } from "../services";
import { log } from "../utils";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    log.error(e.message);
    return res.status(409).send(e.message);
  }
}

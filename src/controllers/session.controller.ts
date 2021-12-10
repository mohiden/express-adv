import { Request, Response } from "express";
import { IUser } from "src/models";
import { validatePassword, createSession } from "../services";

export async function createSessionHandler(req: Request, res: Response) {
  //validate user password
  const user = (await validatePassword(req.body)) as IUser;

  if (!user) res.status(401).send("Invalid Email or Password");

  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create access token

  //create refresh token

  //send access&refresh token
}

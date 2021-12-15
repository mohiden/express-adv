import { Request, Response } from "express";
import { IUser } from "src/models";
import { signJwt } from "../utils";
import { validatePassword, createSession, findSessions, updateSession } from "../services";
import config from 'config';
import { createUserSessionInput } from "../schemas";

export async function createUserSession(req: Request<{}, {}, createUserSessionInput["body"]>, res: Response) {
  //validate user password
  const user = (await validatePassword(req.body)) as IUser;
  if (!user) res.status(401).send("Invalid Email or Password");

  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  
  //create access token
  const accessToken = signJwt({
    ...user,
    session: session._id
  }, {
    expiresIn: config.get<string>('accessTokenTtl'), // 15 minutes
  });

  //create refresh token
  const refreshToken = signJwt({
    ...user,
    session: session._id,
  }, {
    expiresIn: config.get<string>('refreshTokenTtl'), // 1 year
  }, "private");

  //send access&refresh token
  return res.status(200).send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(_: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({user: userId, valid: true});
  return res.send(sessions);
}

export async function deleteSessionHandler(_:Request, res: Response) {
  const sessionId = res?.locals?.user?.session;
  await updateSession({_id: sessionId}, {valid: false});
  return res.send({
    accessToken: null,
    refreshToken: null
  })
}
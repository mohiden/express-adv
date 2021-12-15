import {get} from 'lodash';
import {verifyJwt, signJwt} from '../utils';
import { FilterQuery, UpdateQuery } from "mongoose";
import { ISession, Session } from "../models";
import { findUser } from '.';
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<ISession>) {
 return Session.find(query).lean(); 
}

export async function updateSession(query: FilterQuery<ISession>, update: UpdateQuery<ISession>){
  return Session.updateOne(query, update);
}

export async function reIssueAccessToken(refreshToken: string) {
   const {decoded} = verifyJwt(refreshToken, "private");
   if(!decoded && !get(decoded, "session")){
    return false
   }
   const session = await Session.findById(get(decoded, "session"));

   if(!session || session.valid) false;

   const user = await findUser({_id: session?.user});

   if(!user) false;

   //create access token
  const accessToken = signJwt({
    ...user,
    session: session?._id
  }, {
    expiresIn: config.get<string>('accessTokenTtl'), // 15 minutes
  });

  return accessToken;
}
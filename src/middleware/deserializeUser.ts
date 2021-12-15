import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services";
import { verifyJwt } from "../utils";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh"); 


    if(!accessToken ) return next()

    const {decoded, expired} = verifyJwt(accessToken);
    

    if(decoded) {
        res.locals.user = decoded;
        return next();
    }

    
    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);
        if(!newAccessToken) {
            return next();
        }
        res.setHeader('x-access-token', newAccessToken);
        const result = verifyJwt(newAccessToken);
        res.locals.user = result.decoded;
    }

    return next();
} 
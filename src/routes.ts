import { Express, Response } from 'express';

export default function routes(app: Express) {
    app.get("/healthcheck", (_, res: Response) => {
        res.sendStatus(200);
    })
}
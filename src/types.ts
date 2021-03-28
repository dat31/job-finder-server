import { Request, Response } from "express";
import { Redis } from "ioredis";
import { voteStatusLoader } from "./loader";

export type Context = {
    req: Request & {
        session: any
    },
    redis: Redis
    res: Response
    voteStatusLoader: typeof voteStatusLoader
}

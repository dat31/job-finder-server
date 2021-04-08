import { Request, Response } from "express";
import { Redis } from "ioredis";
import { voteStatusLoader } from "./loader";

export type Context = {
    req: Request & {
        session: Request["session"] & {
            userId: number
            test1: any,
            test2: any
        }
    },
    redis: Redis
    res: Response
    voteStatusLoader: typeof voteStatusLoader
}

export type GeoPluginResponse = {
    geoplugin_city: string
    geoplugin_latitude: string
    geoplugin_longitude: string
}

export enum Role {
    CANDIDATE = "CANDIDATE",
    ADMIN = "ADMIN",
    COMPANY = "COMPANY"
}

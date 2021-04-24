import { Request, Response } from "express";
import { Redis } from "ioredis";

export type Context = {
    req: Request & {
        session: Request["session"] & {
            userId?: number
        }
    },
    redis: Redis
    res: Response
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

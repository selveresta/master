import { Context } from "telegraf";

export interface SessionData {
    film: object
}

export interface IBotContext extends Context {
    session: SessionData
}
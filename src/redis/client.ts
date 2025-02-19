import { Redis } from "ioredis";
import { env } from "../env";

export const redis = new Redis(env.POSTGRES_URL);

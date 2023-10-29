import { Redis } from "@upstash/redis";

class RedisHandler {
  private static instance: RedisHandler | null = null;
  private redis: Redis;

  constructor() {
    this.redis = Redis.fromEnv();
  }

  public static getInstance(): RedisHandler {
    if (!RedisHandler.instance) {
      RedisHandler.instance = new RedisHandler();
    }
    return RedisHandler.instance;
  }

  public getRedisInstance(): Redis {
    return this.redis;
  }
}

const redisHandler = RedisHandler.getInstance();

export default redisHandler;

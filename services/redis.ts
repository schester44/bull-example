import Redis from "ioredis";

export function createRedisClient() {
  console.log(process.env.REDIS_URL);

  return new Redis(process.env.REDIS_URL as string, {
    maxRetriesPerRequest: null,
  });
}

export const redisClient = createRedisClient();

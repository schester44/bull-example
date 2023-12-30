import { Queue, QueueOptions } from "bullmq";
import { redisClient } from "../services/redis";

export function createQueue(queueName: string, options?: QueueOptions) {
  const queue = new Queue(queueName, {
    connection: redisClient,
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 2,
    },
    ...options,
  });

  return queue;
}

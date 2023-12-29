import { Worker, Processor } from "bullmq";
import { redisClient } from "../services/redis";

export function createWorker(queueName: string, processor: Processor) {
  return new Worker(queueName, processor, { connection: redisClient });
}

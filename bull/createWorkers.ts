import { Processor, Queue, Worker } from "bullmq";
import { createQueue } from "./createQueue";
import { QueueName } from "../constants";
import { createWorker } from "./createWorker";

export function createWorkers(queueMap: Record<QueueName, { processor: Processor }>) {
  const queueKeys = Object.keys(queueMap) as QueueName[];

  const queues: Partial<Record<QueueName, { name: QueueName,queue: Queue; workers: Worker[] }>> =
    {};

  queueKeys.forEach((name) => {
    const queue = createQueue(name);

    const worker = createWorker(name, queueMap[name].processor);

    queues[name] = { name, queue, workers: [worker] };
  });

  return { queues };
}

import { Processor, Queue, Worker } from "bullmq";
import { createQueue } from "./createQueue";
import { JobName } from "../constants";
import { createWorker } from "./createWorker";

export function createWorkers(queueMap: Record<JobName, Processor>) {
  const queueKeys = Object.keys(queueMap) as JobName[];

  const queues: Partial<Record<JobName, { queue: Queue; workers: Worker[] }>> =
    {};

  queueKeys.forEach((name) => {
    const queue = createQueue(name);

    const worker = createWorker(name, queueMap[name]);

    queues[name] = { queue, workers: [worker] };
  });

  return { queues };
}

import { Queue, QueueOptions } from "bullmq";
import { QueueName } from "../constants";
import { createQueue } from "./createQueue";


export function createQueues(queuesToCreate: Array<{ name: string, options?: QueueOptions }>) {
    const queues = queuesToCreate.reduce((acc, { name, options }) => {
        acc[name as QueueName] = createQueue(name, options)

        return acc;
    }, {} as Record<QueueName, Queue>)

    return queues;
}
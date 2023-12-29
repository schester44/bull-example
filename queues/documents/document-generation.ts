import { Job } from "bullmq";

export async function handleDocumentGeneration(job: Job) {
  console.log(`processing job ${job.id}`, job.data);
}

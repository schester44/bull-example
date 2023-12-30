export const queueNames = {
  DOCUMENT_GENERATION: "DOCUMENT_GENERATION",
} as const;

export type QueueName = (typeof queueNames)[keyof typeof queueNames];

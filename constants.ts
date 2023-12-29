export const jobNames = {
  DOCUMENT_GENERATION: "DOCUMENT_GENERATION",
} as const;

export type JobName = (typeof jobNames)[keyof typeof jobNames];

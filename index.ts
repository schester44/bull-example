import Express from "express";
import { createWorkers } from "./bull/createWorkers";
import { jobNames } from "./constants";
import { handleDocumentGeneration } from "./queues/documents/document-generation";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";

const { queues } = createWorkers({
  [jobNames.DOCUMENT_GENERATION]: handleDocumentGeneration,
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/jobs");

createBullBoard({
  queues: Object.values(queues).map(({ queue }) => new BullAdapter(queue)),
  serverAdapter: serverAdapter,
});

const app = Express();

app.use("/jobs", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Running on 3000...");
  console.log("For the UI, open http://localhost:3000/jobs");
  console.log("Make sure Redis is running on port 6379 by default");
});

queues.DOCUMENT_GENERATION?.queue.add("policy", { policyId: "abc-123" });

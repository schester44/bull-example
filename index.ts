import Express from "express";
import { createWorkers } from "./bull/createWorkers";
import { queueNames } from "./constants";
import { handleDocumentGeneration } from "./queues/documents/document-generation";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { createQueues } from "./bull/createQueues";

/**
 * 
 * This is all in one file but would be different files when implemented for producton since the worker would be a separate process
 */

// Start Worker
createWorkers({
  [queueNames.DOCUMENT_GENERATION]: { processor: handleDocumentGeneration },
});

// End Worker



// Start App

const queues = createQueues([{ name: queueNames.DOCUMENT_GENERATION }])

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/jobs");

createBullBoard({
  queues: Object.values(queues).map((queue) => new BullAdapter(queue)),
  serverAdapter: serverAdapter,
});

const app = Express();

app.use("/jobs", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Running on 3000...");
  console.log("For the UI, open http://localhost:3000/jobs");
  console.log("Make sure Redis is running on port 6379 by default");
});


const generateBillingInvoice = ({ policyTermId }: { policyTermId: string }) => queues.DOCUMENT_GENERATION.add('BILLING_INVOICE', { policyTermId })


generateBillingInvoice({ policyTermId: "abc-123" })
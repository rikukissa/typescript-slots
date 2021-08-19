import fastify from "fastify";

import { spin } from "./spin";

const server = fastify();

let credits = 1000;

server.get("/api/credits", async () => {
  return { credits };
});

server.get("/api/spin", async (_request, reply) => {
  const result = spin(credits);

  credits = result.credits;

  reply.status(200).send(result);
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

import { createServer } from "@graphql-yoga/node";
import { typeDefs } from "../../schema";

const server = createServer({
  cors: false,
  endpoint: "/api/graphql",
  schema: {
    typeDefs,
  },
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server.requestListener;

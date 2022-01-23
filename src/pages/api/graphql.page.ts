import { createServer } from "@graphql-yoga/node";
import { typeDefs } from "../../schema";
import { resolvers } from "../../server/resolvers";

const server = createServer({
  cors: false,
  endpoint: "/api/graphql",
  schema: {
    typeDefs,
    resolvers,
  },
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server.requestListener;

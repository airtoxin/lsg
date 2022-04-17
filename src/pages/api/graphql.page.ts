import { typeDefs } from "../../schema";
import { resolvers } from "../../server/resolvers";
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({ schema: { typeDefs, resolvers } });

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;

import { typeDefs } from "../../schema";
import { resolvers } from "../../server/resolvers";
import { ApolloServer } from "apollo-server-express";
import { Request, Response } from "express";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const getApolloMiddleware = async () => {
  await apolloServer.start();
  return apolloServer.getMiddleware({
    path: "/api/graphql",
  });
};

const handler = async (req: Request, res: Response) => {
  const apolloMiddleware = await getApolloMiddleware();
  await new Promise((resolve, reject) => {
    apolloMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export default handler;

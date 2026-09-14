import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginLandingPageLocalDefault} from "@apollo/server/plugin/landingPage/default";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();
const PORT = 4000;


// A plain health-check route, handy for confirming the server is up

app.get("/", (req, res) => {
    res.send("Bill Assistant server is running");
});

//Build the GraphQL server by handing Apollo our schema + resolvers.
// It now understands askBill and knows which function answers it.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Force the interactive Sandbox to load on a browser (GET) visit to /graphql
    plugins: [ApolloServerPluginLandingPageLocalDefault()],


});

// Apollo must be started before it can be attached to Express.
// This is async, so we await it. Hence the top-level wait below.
await server.start();


// Mount the GraphQL API at /graphql.
// express.json() parses incoming JSON request bodies
// expressMiddleware hands those request to Apollo. GraphQL requests arrive as JSON, so both are needed.

app.use("/graphql", express.json(), expressMiddleware(server));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';

import schema from './data/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use(compression());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true
}));

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_API_KEY,
    stores: [
        {
            name: 'inMemEmbeddedCache',
            inMemory: {
                cacheSize: 20971520 // 20 MB
            }
        }
    ],
    queryCache: {
        publicFullQueryStore: 'inMemEmbeddedCache'
    }
});

engine.listen({
    port: GRAPHQL_PORT,
    expressApp: graphQLServer,
}, () =>
        console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`)
);

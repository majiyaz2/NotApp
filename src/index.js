const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

const port = process.env.PORT || 4000;

const typeDefs = gql`
type Query{
    hello: String
}
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
}

server = new ApolloServer({
    typeDefs,
    resolvers,
});
const app = express();
async function startServer() {
 
    await server.start();
    server.applyMiddleware({app, path: '/api'});
}
startServer();




// app.get('/', (req, res)=>res.send("Hello World"))
app.listen(4000, () => 
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`)
);
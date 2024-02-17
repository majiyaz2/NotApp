require('dotenv').config();
// Loading the dependencies
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

// Loading local modules
const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// Setting the port and host ip
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;




const app = express();
db.connect(DB_HOST);
server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {models}
    }
});
async function startServer() {
 
    await server.start();
    server.applyMiddleware({app, path: '/api'});
}
startServer();




// app.get('/', (req, res)=>res.send("Hello World"))
app.listen(4000, () => 
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`)
);
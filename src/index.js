require('dotenv').config();
const jwt = require("jsonwebtoken");
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require("graphql-depth-limit");
const {createComplexityLimitRule} = require('graphql-validation-complexity');
// Loading the dependencies
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

// Loading local modules
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Setting the port and host ip
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;


const getUser = token => {
    if(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }catch(err){
            throw new Error('Session invalid');
        }
    }
}

const app = express();
app.use(helmet());
app.use(cors());
db.connect(DB_HOST);
server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context:  ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user);
        return {models, user};
    },
    
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
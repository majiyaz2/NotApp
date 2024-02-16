const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

const port = process.env.PORT || 4000;

let notes = [
    {id: '1', content: 'This is a note', author: 'Adam Scott'},
    {id: '2', content: 'This is another note', author: 'Harlow Everly'},
    {id: '3', content: 'Another One', author: 'DJ Khaled'}
]

const typeDefs = gql`
    type Note{
        id: ID!
        content: String!
        author: String!
    }

    type Query{
        hello: String
        notes: [Note!]!
        note(id: ID!): Note!
    }

   

`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    
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
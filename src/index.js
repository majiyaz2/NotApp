const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const db = require('./db')
require('dotenv').config();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;


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

    type Mutation {
        newNote(content: String!): Note!
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
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length+1),
                content: args.content,
                author: 'Adam Scott'
            };
            notes.push(noteValue)
            return noteValue;
        }
    }
}

const app = express();
db.connect(DB_HOST);
server = new ApolloServer({
    typeDefs,
    resolvers,
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
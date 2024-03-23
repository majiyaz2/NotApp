**NotedAPI: A Social Note Taking API**

NotedAPI is a social note-taking API that allows users to create, read, update, and delete their own notes. Users can also view a feed of notes created by other users, read individual notes from others, and "favorite" notes they like. The application supports plain text and Markdown formatting for notes.

**Features**

- User authentication (create account, login, logout)
- Create, read, update, and delete notes
- View a feed of notes created by other users
- Read individual notes created by others
- Favorite notes from other users
- Retrieve user profile information (self and others)
- Retrieve a list of favorited notes

**Technologies**

The NoteAPI API will be built using the following technologies:

- GraphQL: An open-source query language and specification for building APIs. GraphQL provides a flexible and efficient way to request and retrieve data from the server.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine for running JavaScript on the server.
- Express.js: A minimal and flexible Node.js web application framework for building APIs and web servers.
- MongoDB: A NoSQL document database used for storing and retrieving data.
- Mongoose: An Object Data Modeling (ODM) library that provides a higher-level abstraction for working with MongoDB.

**Getting Started**

1. Create a .env file in the project root and add the following environment variables:
   - DB_HOST: The MongoDB connection URL (e.g., mongodb://localhost:27017/noteapi)
   - JWT_SECRET: A random string to be used for JSON Web Token (JWT) encryption

2. Install the project dependencies by running:

   npm install

3. Start the development server:

   npm run dev

   This will start the GraphQL server at http://localhost:4000 (or the configured port).

4. Open the GraphQL Playground by visiting https://studio.apollographql.com/sandbox/explorer in your browser.

5. In the GraphQL Playground, set the HTTP Headers to include:

   {
     "Authorization": "<YOUR_JWT_TOKEN>"
   }

   Replace <YOUR_JWT_TOKEN> with an actual JWT token obtained from the API.

6. To explore the API, set the GraphQL endpoint in the Playground to http://localhost:4000/api.

7. The API can also be explored using the hosted url link https://notapp.onrender.com/api

**Contributing**

Contributions to the Notedly project are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md) to get started.

**License**

This project is licensed under the [MIT License](LICENSE).

**Contact**

For questions or feedback, please contact [majiyaz2@gmail.com](mailto:majiyaz2@gmail.com).

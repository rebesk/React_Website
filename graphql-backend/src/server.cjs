const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');
const typeDefs = require('./graphql/typeDefs.cjs');
const resolvers = require('./graphql/resolvers.cjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('./utils/cloudinary.cjs'); 
const { uploadToCloudinary } = require('./utils/uploadToCloudinary.cjs'); 

const app = express();

app.use(cors());
app.use(graphqlUploadExpress());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
});

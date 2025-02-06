import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    ingredients: [String!]!
    instructions: String!
    groceries: [Grocery]
  }

  type Grocery {
    id: ID!
    name: String!
    quantity: String!
  }

  type Query {
    recipes: [Recipe]
  }

  type Mutation {
    addRecipe(title: String!, ingredients: [String!]!, instructions: String!): Recipe
    addGrocery(recipeId: ID!, name: String!, quantity: String!): Grocery
  }
`;

const resolvers = {
  Query: {
    recipes: async () => await prisma.recipe.findMany({ include: { groceries: true } }),
  },
  Mutation: {
    addRecipe: async (_, args) => {
      return await prisma.recipe.create({
        data: {
          title: args.title,
          ingredients: args.ingredients,
          instructions: args.instructions,
        },
      });
    },
    addGrocery: async (_, args) => {
      return await prisma.grocery.create({
        data: {
          name: args.name,
          quantity: args.quantity,
          recipe: { connect: { id: args.recipeId } },
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
});

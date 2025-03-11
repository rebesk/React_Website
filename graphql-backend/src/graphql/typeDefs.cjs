const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  enum MeasurementType {
    GRAMS
    LITERS
    DECILITERS
    TABLESPOONS
    TEASPOONS
    PIECES
  }

  type Recipe {
    id: ID!
    title: String!
    pictureUrl: String
    instructions: String!
    ingredients: [Ingredient!]!
  }

  type Ingredient {
    id: ID!
    name: String!
    measurement: Measurement
    recipe: Recipe!
  }

  type Measurement {
    id: ID!
    measurementType: MeasurementType!
    amount: Float!
    ingredients: [Ingredient!]!
  }

  type Query {
    recipes: [Recipe]
  }

  type Mutation {
    addRecipe(
      title: String!
      ingredients: [IngredientInput!]!
      instructions: String!
      picture: Upload
    ): Recipe

    addIngredient(
      recipeId: ID!
      name: String!
      measurementType: MeasurementType!
      amount: Float!
    ): Ingredient

    deleteRecipe(id: ID!): Recipe!
    deleteIngredient(id: ID!): Ingredient!
    
    updateRecipe(
      id: ID!
      title: String
      instructions: String
      picture: Upload
    ): Recipe!
  }

  input IngredientInput {
    name: String!
    measurementType: MeasurementType!
    amount: Float!
  }
`;

module.exports = typeDefs;

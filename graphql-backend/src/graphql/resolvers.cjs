const { GraphQLUpload } = require('graphql-upload');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadToCloudinary } = require('../utils/uploadToCloudinary.cjs');

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    recipes: async (_, __, { prisma }) => {
      return await prisma.recipe.findMany({
        include: { ingredients: { include: { measurement: true } } },
      });
    },
  },

  Mutation: {
    addRecipe: async (_, { title, ingredients, instructions, picture }, { prisma }) => {
      let pictureUrl = null;

      if (picture) {
        pictureUrl = await uploadToCloudinary(picture, 'recipe_images');
      }

      const newRecipe = await prisma.recipe.create({
        data: {
          title,
          pictureUrl,
          instructions,
          ingredients: {
            create: ingredients.map((ingredient) => ({
              name: ingredient.name,
              measurement: {
                create: {
                  measurementType: ingredient.measurementType,
                  amount: ingredient.amount,
                },
              },
            })),
          },
        },
        include: {
          ingredients: {
            include: {
              measurement: true,
            },
          },
        },
      });

      return newRecipe;
    },

    deleteRecipe: async (_, { id }) => {
      const deletedRecipe = await prisma.recipe.delete({
        where: { id },
      });
      return deletedRecipe;
    },
    updateRecipe: async (_, { id, title, ingredients, instructions, picture }, { prisma }) => {
      let pictureUrl = null;

      if (picture) {
        pictureUrl = await uploadToCloudinary(picture, 'recipe_images');
      }

      const updatedRecipe = await prisma.recipe.update({
        where: { id },
        data: {
          title,
          pictureUrl,
          instructions,
          ingredients: {
            deleteMany: {}, 
            create: ingredients.map((ingredient) => ({
              name: ingredient.name,
              measurement: {
                create: {
                  measurementType: ingredient.measurementType,
                  amount: ingredient.amount,
                },
              },
            })),
          },
        },
        include: {
          ingredients: {
            include: {
              measurement: true,
            },
          },
        },
      });

      return updatedRecipe;
    },
  },
};

module.exports = resolvers;
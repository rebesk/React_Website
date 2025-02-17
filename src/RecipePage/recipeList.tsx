import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';

// GET_RECIPES: Gets the same data from database as AddRecipe, make module for all?
const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      ingredients
      instructions
      groceries {
        name
        quantity
      }
    }
  }
`;

//DELETE_RECIPE: Get the data of recipe and method for deleting them from the list in db
const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

// useStyles: change styling
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 'calc(100% - 80px)', // Ensures full viewport height
    maxWidth: 'calc(100% - 250px)', 
  },
  card: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424)',
    padding: '40px',
    marginBottom: '20px', // Add margin between cards
    position: 'relative', // Ensures text stays on top
    listStyleType: 'none', // Remove bullet points from the main list
  },
  picture: {
    display: 'flex',
    borderRadius: '20%',
    minWidth: '30%',
    maxWidth: '80%',
  },
  title: {
    top: 0,
    fontWeight: 'bold',
    fontSize: '30px',
    textAlign: 'center',
  },
  listItem: {
    listStyleType: 'disc', // Use default bullet points for ingredients list items
    textAlign: 'left',
  },
  ingredientsList: {
    listStyleType: 'disc', // Use default bullet points for ingredients list
    paddingLeft: '20px', // Add some padding to indent the list
  },
});

const RecipeList: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);


  const handleDeleteRecipe = async (id: string) => { // function for deleting recipe from db and showing list
    try {
      console.log(`Deleting recipe with id: ${id}`);
      await deleteRecipe({
        variables: { id },
        refetchQueries: [{ query: GET_RECIPES }],
      });
      console.log(`Recipe with id: ${id} deleted successfully`);
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  if (loading) return <p>Loading...</p>; // loading function, awaiting collecting data
  if (error) return <p>Error: {error.message}</p>; //Error if not possible of getting data instead of crashing

  return (
    <div className={classes.root}>
      {data.recipes.map((recipe: any) => (
        <div key={recipe.id} className={classes.card}>
          <p className={classes.title}>{recipe.title}</p>
          <img src="/images/grass.png" className={classes.picture} />
          <p>Ingredients:</p>
          <ul className={classes.ingredientsList}>
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index} className={classes.listItem}>{ingredient}</li>
            ))}
          </ul>
          <p>Instructions: {recipe.instructions}</p>
          <ul>
            {recipe.groceries.map((grocery: any) => (
              <li key={grocery.name} className={classes.listItem}>{grocery.name} - {grocery.quantity}</li>
            ))}
          </ul>
          <button onClick={() => { console.log(`Clicked delete for recipe ID: ${recipe.id}`); handleDeleteRecipe(recipe.id)}}>Delete Recipe</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';

// GraphQL Queries
const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      pictureUrl
      instructions
      ingredients {
        name
        measurement {
          measurementType
          amount
        }
      }
    }
  }
`;

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

// Styling
const useStyles = makeStyles({
  gridContainer: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
    '@media (min-width: 900px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424)',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  picture: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '10px',
    color: ' #daded8',
  },
  fullRecipe: {
    marginTop: '10px',
    padding: '15px',
    background: 'transparent',
    color: '#fff',
    textAlign: 'left',
    width: '100%',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
});

const RecipeList: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    refetchQueries: [{ query: GET_RECIPES }],
  });
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteRecipe({
        variables: { id },
      });
      console.log('Recipe deleted successfully'); // Add logging
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={classes.gridContainer}>
      {data.recipes.map((recipe: any) => (
        <div key={recipe.id} className={classes.card} onClick={() => setSelectedRecipe(selectedRecipe === recipe.id ? null : recipe.id)}>
          <img src={recipe.pictureUrl || "/images/tallrik.png"} className={classes.picture} alt={recipe.title} />
          <p className={classes.title}>{recipe.title}</p>

          {selectedRecipe === recipe.id && (
            <div className={classes.fullRecipe}>
              <p><strong>Ingredients:</strong></p>
              <ul>
                {recipe.ingredients.map((ingredient: any, index: number) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.measurement.amount} {ingredient.measurement.measurementType}
                  </li>
                ))}
              </ul>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button className={classes.deleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteRecipe(recipe.id); }}>Delete Recipe</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
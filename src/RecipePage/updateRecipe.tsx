import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $title: String, $ingredients: [IngredientInput!], $instructions: String, $picture: Upload) {
    updateRecipe(id: $id, title: $title, ingredients: $ingredients, instructions: $instructions, picture: $picture) {
      id
      title
      ingredients {
        name
        measurement {
          measurementType
          amount
        }
      }
      instructions
      pictureUrl
    }
  }
`;

// Styling
const useStyles = makeStyles({
});

const UpdateRecipe: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', measurementType: '', amount: '' }]);
  const [instructions, setInstructions] = useState('');
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const handleUpdateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedIngredients = ingredients.map((ingredient) => ({
        name: ingredient.name,
        measurementType: ingredient.measurementType,
        amount: parseFloat(ingredient.amount),
      }));

      await updateRecipe({
        variables: {
          id: recipeId,
          title,
          ingredients: formattedIngredients,
          instructions,
          picture: pictureFile,
        },
      });

      navigate('/spicea');
    } catch (err) {
      console.error('Error updating recipe:', err);
    }
  };

  return (
    <form onSubmit={handleUpdateRecipe}>
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default UpdateRecipe;
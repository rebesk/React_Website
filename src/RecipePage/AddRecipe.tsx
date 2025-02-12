import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

const ADD_RECIPE = gql`
  mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: String!) {
    addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions) {
      id
      title
      ingredients
      instructions
    }
  }
`;

const useStyles = makeStyles({
  root:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxheight: 'calc(100% - 80px)', // Ensures full viewport height
    maxwidth: 'calc(100% - 250px)', 
  },
  form: {
    width: 'calc(80% - 250x)',
    height: 'calc(80% - 80px)',
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424)',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
    height:'80%',
    width: '45%'
  },
  formboxes: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5%',
    marginTop: '20px',
  },
  formTitle: {
    marginRight: '1.5rem',
  },
  formControl: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
    overflow: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: 'auto',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btnSecondary: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },

});

const AddRecipe: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [addRecipe] = useMutation(ADD_RECIPE);

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRecipe({
        variables: {
          title,
          ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
          instructions,
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
      setTitle('');
      setIngredients('');
      setInstructions('');
      navigate('/spicea'); 
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  return (
    <div className={classes.root}>
        <h1>Add Recipe</h1>
      <form onSubmit={handleAddRecipe} className={`container mt-4 ${classes.form}`} >
        <div className={`form-group ${classes.formTitle}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={`form-control ${classes.formControl}`}
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={classes.formboxes}>
        <div className={`form-group ${classes.formGroup}`}>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            className={`form-control ${classes.formControl}`}
            id="ingredients"
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${classes.formGroup}`}>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className={`form-control ${classes.formControl}`}
            id="instructions"
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        </div>
        <div className={classes.buttonContainer}>
          <button type="submit" className={`btn ${classes.btnPrimary}`}>Add Recipe</button>
          <Link to="/spicea">
            <button type="button" className={`btn ${classes.btnSecondary}`}>Back</button>
          </Link>
        </div>
      </form>
      
    </div>

  );
};

export default AddRecipe;
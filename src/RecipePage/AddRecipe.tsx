import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// GET_RECIPES: Collects data from database
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

// ADD_RECIPE: Manipulate information in the database
const ADD_RECIPE = gql`
  mutation AddRecipe($title: String!, $ingredients: [IngredientInput!]!, $instructions: String!, $picture: Upload) {
    addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, picture: $picture) {
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

// useStyles: change styling 
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 'calc(100% - 80px)', 
    maxWidth: 'calc(100% - 250px)', 
  },
  form: {
    width: '500px',
    height: '100%',
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
    marginRight: '1.5rem',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  formboxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5%',
    marginTop: '1.5rem',
  },
  ingredientBoxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5%',
  },
  ingredientGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1.5rem',
    marginRight: '1.5rem',
  },
  ingredientBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginRight: '1.5rem',
  },
  ingredientInput: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
    overflow: 'auto',
  },
  formBox: {
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
  btn_Add: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btn_Back: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btn_ingredient: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    height: '40px',
    alignSelf: 'flex-start',
    marginBottom: '20px',
  }
});

const AddRecipe: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', measurementType: '', amount: '' }]);
  const [instructions, setInstructions] = useState('');
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [addRecipe] = useMutation(ADD_RECIPE);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', measurementType: '', amount: '' }]);
  };

  type IngredientField = 'name' | 'measurementType' | 'amount';

  const handleIngredientChange = (index: number, field: IngredientField, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedIngredients = ingredients.map((ingredient) => ({
        name: ingredient.name,
        measurementType: ingredient.measurementType,
        amount: parseFloat(ingredient.amount),
      }));

      console.log('Formatted Ingredients:', formattedIngredients);
      console.log('Picture File:', pictureFile);

      await addRecipe({
        variables: {
          title,
          ingredients: formattedIngredients,
          instructions,
          picture: pictureFile,
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
      setTitle('');
      setIngredients([{ name: '', measurementType: '', amount: '' }]);
      setInstructions('');
      setPictureFile(null);
      navigate('/spicea');
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Add Recipe</h1>
      <form onSubmit={handleAddRecipe} className={`container mt-4 ${classes.form}`}>
        <div className={`form-group ${classes.formGroup}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={`form-control ${classes.formBox}`}
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={classes.ingredientBoxes}>
          <h3>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={`form-group ${classes.ingredientGroup}`}>
              <div className={classes.ingredientBox}>
                <label htmlFor={`ingredient-name-${index}`}>Ingredient</label>
                <input
                  type="text"
                  className={`form-control ${classes.ingredientInput}`}
                  id={`ingredient-name-${index}`}
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className={classes.ingredientBox}>
                <label htmlFor={`ingredient-amount-${index}`}>Amount</label>
                <input
                  type="text"
                  className={`form-control ${classes.ingredientInput}`}
                  id={`ingredient-amount-${index}`}
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  required
                />
              </div>
              <div className={classes.ingredientBox}>
                <label htmlFor={`ingredient-measurementType-${index}`}>Measurement</label>
                <select
                  className={`form-control ${classes.ingredientInput}`}
                  id={`ingredient-measurementType-${index}`}
                  value={ingredient.measurementType}
                  onChange={(e) => handleIngredientChange(index, 'measurementType', e.target.value)}
                  required
                >
                  <option value="">Select Measurement Type</option>
                  <option value="GRAMS">Gram (g)</option>
                  <option value="LITERS">Liter (l)</option>
                  <option value="DECILITERS">Deciliter (dl)</option>
                  <option value="TABLESPOONS">Tablespoon (tbsp)</option>
                  <option value="TEASPOONS">Teaspoon (tsp)</option>
                  <option value="PIECES">Pieces (pc)</option>
                </select>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient} className={`btn ${classes.btn_ingredient}`}>
            Add Ingredient
          </button>
        </div>
        <div className={`form-group ${classes.formGroup}`}>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className={`form-control ${classes.formBox}`}
            id="instructions"
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${classes.formGroup}`}>
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            className={`form-control ${classes.formBox}`}
            id="picture"
            onChange={(e) => setPictureFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <button type="submit" className={`btn ${classes.btn_Add}`}>Add Recipe</button>
          <Link to="/spicea">
            <button type="button" className={`btn ${classes.btn_Back}`}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
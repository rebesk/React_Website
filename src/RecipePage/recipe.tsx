import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import RecipeList from './recipeList';
import AddRecipe from './AddRecipe';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        maxheight: 'calc(100% - 80px)', // Ensures full viewport height
        maxwidth: 'calc(100% - 250px)', 
    },
    container: {
        display: 'flex',
        justifyContent: 'center',

    },
    card: { 
        display: 'flex', 
        flexDirection: 'column', 
        maxwidth: 'min(90vw, 90vh)', 
        maxheight: 'min(60vw, 50vh)',
        alignItems: 'center', 
        borderRadius: '20px',
        zIndex: 1,
        border: '2px solid black',
    },
    picture: {
        display: 'flex',
        borderRadius: '20%',
        width: '30%',
        marginTop: '10px',
    }
});

const Recipe: React.FC = () => {
    const classes = useStyles();

  return (
    <div className={classes.root}>
        <h2>Recipes</h2>
        <RecipeList/>
    </div>
  );
}

export default Recipe;

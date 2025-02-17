import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@material-ui/core';
import Recipe from './RecipePage/recipe';
import { Sidebar } from './sidebar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxheight: 'calc(100% - 80px)',
    maxwidth: 'calc(100% - 250px)',  
  },

});

export const Spicea: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div >
        <Recipe />
      </div>
    </div>
  );
};
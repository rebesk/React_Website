import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@material-ui/core';

interface WorkoutsProps {
    name: string;
    }

const useStyles = makeStyles({ 
    workouts: {
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        width: '100vw', 
        height: '100vh', 
        alignItems: 'center', 
        background: 'linear-gradient(180deg, #eeeeee, #9d8a7c, #796254 , #523f31 )',
    },
});

export const Workouts: React.FC = () => {
    const classes = useStyles();
    const useState = React.useState;
    const useEffect = React.useEffect;
    const [workouts, setWorkouts] = useState<WorkoutsProps[]>([]);


  return (
    <div className={classes.workouts}>
      <h1>Workouts</h1>
    </div>
  );
};
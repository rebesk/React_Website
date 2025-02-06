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
        flexDirection: 'column',
        width: '100vw', 
        height: '100vh', 
      
    },
    header:{
        fontSize: '32px',
        
    },
    logo: { 
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export const Spicea: React.FC = () => {
    const classes = useStyles();
    const useState = React.useState;
    const useEffect = React.useEffect;
    const [workouts, setWorkouts] = useState<WorkoutsProps[]>([]);


  return (
    <div className={classes.workouts}>
    <div style={{ marginTop: '10%' }}></div>
      <img src="/images/spicea.png" className={classes.logo} />

    </div>
  );
};
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import { makeStyles } from '@material-ui/core';
import App from './App';

const useStyles = makeStyles({

  
  container: {
    display: 'flex',
    marginTop: '80px',
    width: 'min(50vw, 80vh)',
    height: 'min(50vw, 80vh)', 
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '50%',
    color: '#daded8',
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424 )',
  },
  button: {
    marginTop: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#eeeeee',
    fontSize: '32px',
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
  },
  content: {
    maxHeight: 0,
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-out',
  },
  contentVisible: {
    maxHeight: '500px',
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      <div className={classes.container}>
        <h1>Welcome!</h1>
        <p>This website is still under development...</p>
        <Button className={classes.button} onClick={toggleContentVisibility}>
          <i className="bi bi-caret-down"></i>
        </Button>
        <div className={`${classes.content} ${isContentVisible ? classes.contentVisible : ''}`}>
          <p>Sneaky little text</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

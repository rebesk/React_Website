import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex', 
    justifyContent: 'center', 
    flexDirection: 'column', 
    width: '100vw',
    height: '80vh',
    alignItems: 'center', 
    borderRadius: '0 0 30% 30%',
    background: 'linear-gradient(180deg, #eeeeee, #9d8a7c, #796254 , #523f31 )',
  },
  appLogo: {
    width: 'auto',
    height: 'auto',
  },
  Button: {
    marginTop: '100px',
    backgroundColor: 'transparent',
    borderWidth: '0px',
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
    maxHeight: '500px', // Adjust this value based on your content height
  },
  
});


const Home: React.FC = () => {
  const classes = useStyles();
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };
    return (
      <div className={classes.container}>
         <img src="/images/Logo1.png" className={classes.appLogo} />
         <h1>Welcome!</h1>
        <p>This website is still under development...</p>
        <Button variant="contained" className={classes.Button} onClick={toggleContentVisibility}>
        <i className="bi bi-caret-down"></i></Button>  
        <div className={`${classes.content} ${isContentVisible ? classes.contentVisible : ''}`}>
        <p>Your roll-down content goes here.</p>
      </div>
    </div>
    );
  };
  
  export default Home;
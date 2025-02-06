import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex', 
    width: 'min(90vw, 90vh)', /* Responsive size */
    height: 'min(90vw, 90vh)', /* Ensures it's a circle */
    justifyContent: 'center', 
    flexDirection: 'column', 
    alignItems: 'center', 
    borderRadius: '50%',
    background: 'linear-gradient(180deg, #eeeeee, #9d8a7c, #796254 , #523f31 )',
  },
  appLogo: {
    width: '80%',
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
      <div>
        <div className={classes.container}>
         <h1>Welcome!</h1>
        <p>This website is still under development...</p>
        <Button variant="contained" className={classes.Button} onClick={toggleContentVisibility}>
        <i className="bi bi-caret-down"></i></Button>  
        <div className={`${classes.content} ${isContentVisible ? classes.contentVisible : ''}`}>
        <p>Your roll-down content goes here.</p>
        </div>
      </div>
    </div>
    );
  };
  
  export default Home;
// filepath: /c:/Users/Rebec/react_website/src/About.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({ 
  about: {
    display: 'flex', // Set the display value to flex
    justifyContent: 'center', // Center content horizontally
    flexDirection: 'row', // Arrange children in a column
    width: '100vw', // Take the full width of the screen
    height: '100vh', // Take the full height of the screen
    alignItems: 'center', // Center content
    background: 'linear-gradient(180deg, #eeeeee, #9d8a7c, #796254 , #523f31 )',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '65%',
    height: '40%',
    position: 'relative',
    textAlign: 'center',
    zIndex: 1,
  },

  text: {
    fontFamily: 'Arial, sans-serif', // Set the font family
  },

  profile: {
    position: 'absolute',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'left',
    flexDirection: 'row',
    width: '30%',
    zIndex: 2,
    left: '5%',
  },

});

const About: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    fetch('/about.txt')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error fetching the text file:', error));
  }, []);

  return (
    <div className={classes.about}>
      <img src="/images/profil.png" className={classes.profile} />
      <div className={classes.card}>
        <p className="fw-bold fs-2">About</p>
        <p>Who made this website?</p>
      
        <div>
          <h3>Rebecca</h3>
          <pre>{content}</pre>
        </div>
      </div>
      
    </div>
  );
};

export default About;
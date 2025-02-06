// filepath: /c:/Users/Rebec/react_website/src/About.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({ 
  card: {
    display: 'flex', // Set the display value to flex
    flexDirection: 'column', // Arrange children in a column
    width: 'min(90vw, 90vh)', /* Responsive size */
    height: 'min(60vw, 50vh)',
    alignItems: 'center', // Center content
    borderRadius: '20px',
    position: 'relative',
    textAlign: 'center',
    zIndex: 1,
    background: 'linear-gradient(180deg, #eeeeee, #9d8a7c, #796254 , #523f31 )',
  },

  picture: {
    display: 'flex',
    borderRadius: '50%',
    position: 'absolute',
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
    <div >
      <img src="/images/grass.png" className={classes.picture} />
      <div className={classes.card}>

        <h1 className="fw-bold fs-2">About</h1>
      
        <div>
          <pre>{content}</pre>
        </div>
      </div>
      
    </div>
  );
};

export default About;
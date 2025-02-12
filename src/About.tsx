// filepath: /c:/Users/Rebec/react_website/src/About.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxheight: 'calc(100% - 100px)', // Ensures full viewport height
    maxwidth: 'calc(100% - 250px)', // Full width
    position: 'relative', // Needed for absolute positioning of the picture
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 'min(80vw, 60vh)', // Keeps it responsive
    height: 'min(60vw, 30vh)',
    alignItems: 'center',
    borderRadius: '20px',
    textAlign: 'center',
    zIndex: 1,
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424)',
    padding: '40px',
    position: 'relative', // Ensures text stays on top
  },
  picture: {
    width: 'min(30vw, 30vh)', 
    height: 'min(30vw, 30vh)',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%', // Align vertically to the center
    left: '0',
    transform: 'translateY(-50%)', // Keeps it vertically centered
    zIndex: 2, // Ensures it overlaps on top
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
    <div className={classes.root}>
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

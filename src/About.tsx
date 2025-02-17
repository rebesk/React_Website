// filepath: /c:/Users/Rebec/react_website/src/About.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%', 
    minHeight: '300px',
    alignItems: 'center',
    borderRadius: '20px',
    textAlign: 'center',
    zIndex: 1,
    background: 'linear-gradient(180deg, #959581, #768064, #4c593e , #2c3424)',
    padding: '40px',
    position: 'relative', // Ensures text stays on top
  },
  textWindow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  picture: {
    display: 'flex',
    left: -100,
    width: '50%', 
    borderRadius: '50%',
    position: 'relative',
    top: 'translateY(-50%)', // Keeps it vertically centered
    zIndex: 1000, // Ensures it overlaps on top
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
    <div>
      <div className={classes.card}>
      <img src="/images/grass.png" className={classes.picture} />

        <div className={classes.textWindow}>
        <h1 className="fw-bold fs-2">About</h1>
          <pre>{content}</pre>
        </div>
      </div>
    </div>
  );
};

export default About;

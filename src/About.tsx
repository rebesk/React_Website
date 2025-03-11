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
    margin: 'auto',
    marginTop: '20px',
    position: 'relative',
  },
  textWindow: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    left: -200,
    position: 'relative',
    zIndex: 1000,
    width: '50%', // Ensure the textWindow takes up the remaining space
  },
  picture: {
    display: 'flex',
    left: -200,
    width: '50%', 
    borderRadius: '50%',
    position: 'relative',
    top: 'translateY(-50%)', 
    zIndex: 1000,
    marginRight: '20px', // Add margin to separate the picture from the text
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
      <img src="/images/tallrik.png" className={classes.picture} />

        <div className={classes.textWindow}>
        <h1 className="fw-bold fs-2">About</h1>
          <pre>{content}</pre>
        </div>
      </div>
    </div>
  );
};

export default About;

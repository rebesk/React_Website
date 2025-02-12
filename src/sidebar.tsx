import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed', // Ensure the sidebar is fixed to the viewport
    left: '0',
    width: '250px',
    height: '100%', // Ensure the sidebar takes the full height of the viewport
    background: '#222',
    color: 'white',
    transition: 'left 0.3s ease-in-out',
    paddingTop: '60px',
  },
  nav: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    padding: '10px 20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const Sidebar: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.sidebar}>
      <nav>
        <ul className={classes.nav}>
          <li className={classes.navItem}>
            <a href="#" className={classes.navLink}>Home</a>
          </li>
          <li className={classes.navItem}>
            <a href="#" className={classes.navLink}>About</a>
          </li>
          <li className={classes.navItem}>
            <a href="#" className={classes.navLink}>Services</a>
          </li>
          <li className={classes.navItem}>
            <a href="#" className={classes.navLink}>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
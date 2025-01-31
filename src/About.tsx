// filepath: /c:/Users/Rebec/react_website/src/About.tsx
import React, { useEffect, useState } from 'react';

const About: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/about.txt')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error fetching the text file:', error));
  }, []);

  return (
    <div className="About">
      <h1>About</h1>
      <img src="/images/dnd.png" className="profile-pic" />
      <div>
        <h2>Who I am</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default About;
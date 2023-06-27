import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import './App.css';

const App: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://alex.devel.softservice.org/testapi/')
      .then(response => {
        setIsLoading(false);
        animateProgress(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const animateProgress = (initialValue: number) => {
    setValue(0);
    const intervalId = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= initialValue) {
          clearInterval(intervalId);
          return initialValue;
        }
        return prevValue + 0.2;
      });
    }, 2000);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(value / 15) * 100}%`, backgroundColor: value >= 15 ? '#00A910' : 'gray' }} />
          <CSSTransition in={value < 15} timeout={500} classNames="message" unmountOnExit>
            <div className="message">You need to reach $15</div>
          </CSSTransition>
        </div>
      )}
    </div>
  );
};

export default App;
import React, { useState, useEffect, useRef, useCallback} from 'react';
import BTCPriceContext from './components/BTCPriceContext';
import BTCPrice from './components/BTCPrice';

const App = () => {
  // State variables to hold Bitcoin price and joke data
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [jokeSetup, setJokeSetup] = useState(null);
  const [jokePunchline, setJokePunchline] = useState(null);

  // Ref to store the interval ID
  const intervalRef = useRef(null);

  // Function to fetch a random joke from an API
  const getJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJokeSetup(data.setup);
      setJokePunchline(data.punchline);
    } catch (error) {
      console.error('Error fetching joke data:', error);
    }
  };

  // Function to fetch the current Bitcoin price from an API
  const getBtcPrice = useCallback(async () => {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        setBitcoinPrice(data.bpi.USD.rate);
    } catch (error) {
        console.error('Error fetching Bitcoin price data:', error);
    }
}, []);

  // useEffect hook to fetch initial data and set up an interval for Bitcoin price updates
  useEffect(() => {
    // Fetch initial data
    getBtcPrice();
    getJoke();

    // Interval for Bitcoin price updates
    intervalRef.current = setInterval(() => {
      getBtcPrice();
    }, 2500);

    // Clearing the interval
    return () => clearInterval(intervalRef.current);
  }, [getBtcPrice]); 

  return (
    <div className='main'>
      <div className='container'>
        <h2>Joke Generator</h2>
        <div className='joke-container'>
          <p className='setup'>{jokeSetup}</p>
          <p className='punchline'>{jokePunchline}</p>
        </div>
        <button onClick={getJoke}>Get another one</button>
      </div>
      <BTCPriceContext.Provider value={{bitcoinPrice}}>
        <BTCPrice/>
      </BTCPriceContext.Provider>
    </div>
  );
};

export default App;
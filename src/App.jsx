import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [jokeSetup, setJokeSetup] = useState(null)
  const [jokePunchline, setJokePunchline] = useState(null)
  const intervalRef = useRef(null)

  const getJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await response.json()
      setJokeSetup(data.setup)
      setJokePunchline(data.punchline)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const getBtcPrice = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await response.json()
      setBitcoinPrice(data.bpi.EUR.rate)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getBtcPrice()
    getJoke()
    
    intervalRef.current = setInterval(() => {
      getBtcPrice();
    }, 5000)

    clearInterval(intervalRef)
  },[])

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
      <div className='footer'>
        <h2>Bitcoin</h2>
        <h3>Current Price: {bitcoinPrice} EUR</h3> 
      </div> 
    </div>
  );
}

export default App;

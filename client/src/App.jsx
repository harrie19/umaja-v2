import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
        const data = await response.json()
        setBitcoinPrice(data.bpi.USD.rate)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
        setLoading(false)
      }
    }

    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Umaja V2 - Bitcoin Tracker</h1>
        {loading ? (
          <p>Loading Bitcoin price...</p>
        ) : (
          <div className="bitcoin-price">
            <h2>Current Bitcoin Price</h2>
            <p className="price">${bitcoinPrice}</p>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
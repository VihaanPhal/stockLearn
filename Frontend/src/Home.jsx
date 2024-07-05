import React, { useState, useEffect } from "react";
// const User = require("../Backend/Model/usersModel");

const Home = () => {
  const [ticker, setStock] = useState("");
  const [quantity, setStockqty] = useState("");
  const [price, setStockPrice] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchStockPrice = async () => {
    //getting the price of the stock
    const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${ticker}&type=STOCKS`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'abc5fb793dmshea929faa2562ca3p12c234jsnec335bb7b4c6',
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      } 
    };

    try {
      const response = await fetch(url, options);
	    const result = await response.json();

      const rawPrice = result.body.primaryData.lastSalePrice;
      const price = parseFloat(rawPrice.replace('$', ''));
      const companyName = result.body.companyName

      setStockPrice(price);
      setCompanyName(companyName);

      console.log(`Buying ${quantity} shares of ${companyName} at price ${rawPrice}`);
      return { price, companyName };
    } catch (error) {
      console.error("Error fetching stock price:", error);
    }
  };

  const handleBuy = async () => {
  
    if (!ticker || !quantity) {
      console.log("Ticker and quantity are required");
    }
    const { price, companyName } = await fetchStockPrice();

    const url2 = "http://localhost:3000/api/user/buy";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc1OGViYTVkMDE2NDMzZTYyZWVjYTQiLCJpYXQiOjE3MjAxNjUyMjAsImV4cCI6MTcyMDQyNDQyMH0.wqz5YPazfqItn_aG6oOmMNGoLCgjM65-wNFY_opYVmQ"
    const options2 = {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ticker: ticker,
        companyName: companyName, 
        purchasePrice: price,
        quantity: parseInt(quantity) 
      })
    };
  
    try {
      
      const response = await fetch(url2, options2);

      if (!response.ok) {
        throw new Error('Failed to buy stocks');
      }

      console.log("Successfully bought stocks!");
  
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchPortfolio = async () => {
    const url3 = "http://localhost:3000/api/user/getPortfolio"; 
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc1OGViYTVkMDE2NDMzZTYyZWVjYTQiLCJpYXQiOjE3MjAxNjUyMjAsImV4cCI6MTcyMDQyNDQyMH0.wqz5YPazfqItn_aG6oOmMNGoLCgjM65-wNFY_opYVmQ"
    const options3 = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    };

    try {
      const response = await fetch(url3, options3);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }
      const portfolioData = await response.json();
      setPortfolio(portfolioData);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleSell = () => {
    console.log("Selling", stockqty, "shares of", stock);
  };

  return (
    <div>
      <input
        id="inputstock"
        className="Input"
        placeholder="Enter stock ticker"
        value={ticker}
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        id="inputqty"
        className="Input"
        placeholder="Enter stock quantity"
        value={quantity}
        onChange={(e) => setStockqty(e.target.value)}
      />
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
      <div>
      <h2>My Portfolio</h2>
      <ul>
        {portfolio.map((item, index) => (
          <li key={index}>
            <p>Ticker: {item.ticker}</p>
            <p>Company Name: {item.companyName}</p>
            <p>Purchase Price: ${item.purchasePrice.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Purchase Date: {new Date(item.purchaseDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

export default Home;

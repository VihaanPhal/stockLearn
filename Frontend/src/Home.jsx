import React, { useState } from "react";
// const User = require("../Backend/Model/usersModel");

const Home = () => {
  const [ticker, setStock] = useState("");
  const [quantity, setStockqty] = useState("");
  const [price, setStockPrice] = useState(null);
  const [companyName, setCompanyName] = useState(null);

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
      console.log('Fetched data:', result);

      const price = result.body.primaryData.lastSalePrice
      const companyName = result.body.companyName

      setStockPrice(price);
      setCompanyName(companyName);

      console.log(`Buying ${quantity} shares of ${companyName} at price ${price}`);

    } catch (error) {
      console.error("Error fetching stock price:", error);
    }
  };

  const handleBuy = async (req, res) => {
  
    if (!ticker || !quantity) {
      return res.status(400).json({ error: "Ticker and quantity are required" });
    }
    const url2 = "localhost:3000/api/user/buy";
    const options2 = {
      method: 'POST',
      // headers: {
      //   'Authorization': 
      // },
      body: JSON.stringify({
        ticker: ticker,
        companyName: companyName, 
        purchasePrice: price,
        quantity: quantity
      })
    };
  
    try {
      await fetchStockPrice();
      if (!price) {
        return res.status(400).json({ error: "Failed to fetch stock price" });
      }
      const response = await fetch(url2, options2);

      if (!response.ok) {
        throw new Error('Failed to buy stocks');
      }

      console.log("Successfully bought stocks!");
  
    } catch (error) {
      res.status(500).json({ error: error.message });
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
    </div>
  );
};

export default Home;

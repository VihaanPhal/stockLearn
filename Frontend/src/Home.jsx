import React, { useState, useEffect, useCallback } from "react";

const token = localStorage.getItem("jwtToken");

const Home = () => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [buyingPower, setBuyingPower] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [ticker]);
  useEffect(() => {
    fetchPortfolio();
    getBuyingPower();
  }, []);

  const getBuyingPower = useCallback(async () => {
    const url = "http://localhost:3000/api/user/getBuyingPower";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to get buying power");
      }
      setBuyingPower(data.buyingPower);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  const fetchStockPrice = useCallback(async () => {
    const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${ticker}&type=STOCKS`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "abc5fb793dmshea929faa2562ca3p12c234jsnec335bb7b4c6",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);

      const rawPrice = result.body.primaryData.lastSalePrice;
      const price = parseFloat(rawPrice.replace("$", ""));
      const companyName = result.body.companyName;

      setPrice(price);
      setCompanyName(companyName);

      console.log(
        `Buying ${quantity} shares of ${companyName} at price ${rawPrice}`
      );
      return { price, companyName };
    } catch (error) {
      console.error("Error fetching stock price:", error);
    }
  }, [ticker, quantity]);

  const handleBuy = async () => {
    if (!ticker || !quantity) {
      console.log("Ticker and quantity are required");
      return;
    }

    const { price, companyName } = await fetchStockPrice();

    if (buyingPower < price * parseInt(quantity)) {
      setError("Not enough buying power");
      return;
    }

    const url = "http://localhost:3000/api/user/buy";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticker,
        companyName,
        purchasePrice: price,
        quantity: parseInt(quantity),
      }),
    };

    setTicker("");
    setQuantity("");

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to buy stocks");
      }
      await fetchPortfolio();
      await getBuyingPower();
      console.log("Successfully bought stocks!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSell = async () => {
    const { price } = await fetchStockPrice();

    const url = "http://localhost:3000/api/user/sell";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticker,
        sellPrice: price,
        quantity: parseInt(quantity),
      }),
    };

    setTicker("");
    setQuantity("");

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        throw new Error(data.error);
      }
      await fetchPortfolio();
      await getBuyingPower();
      console.log("Successfully sold stocks!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchPortfolio = useCallback(async () => {
    const url = "http://localhost:3000/api/user/getPortfolio";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio");
      }
      const portfolioData = await response.json();
      setPortfolio(portfolioData);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Learning Platform</h1>
      </header>
      <main>
        <div className="form-container">
          <div>
            <input
              id="inputstock"
              className="input"
              placeholder="Enter stock ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <input
              id="inputqty"
              className="input"
              placeholder="Enter stock quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="button" onClick={handleBuy}>
              Buy
            </button>
            <button className="button" onClick={handleSell}>
              Sell
            </button>
          </div>
          {error && <div>{error}</div>}
        </div>
        <div>
          <h2>Total Buying Power</h2>
          <div>{buyingPower}</div>
        </div>
        <div className="portfolio-container">
          <h2>My Portfolio</h2>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company Name</th>
                <th>Purchase Price</th>
                <th>Quantity</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr key={index}>
                  <td>{item.ticker}</td>
                  <td>{item.companyName}</td>
                  <td>${item.purchasePrice.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Stock Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

import { React, useState } from "react";

const Home = () => {
  const [stock, setStock] = useState("");
  const [stockqty, setStockqty] = useState("");
  return (
    <div>
      <input
        id="inputstock"
        className="Input"
        placeholder="Enter stock name"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        id="inputqty"
        className="Input"
        placeholder="Enter stock quantity"
        value={stockqty}
        onChange={(e) => setStockqty(e.target.value)}
      />
      <button>Buy</button>
      <button>Sell</button>
    </div>
  );
};

export default Home;

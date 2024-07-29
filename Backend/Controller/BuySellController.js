const User = require("../Model/usersModel");

const buyStocks = async (req, res) => {
  const { ticker, companyName, purchasePrice, quantity } = req.body;

  if (!ticker || !companyName || !purchasePrice || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findById(req.user._id);

    user.portfolio.push({
      ticker,
      companyName,
      purchasePrice,
      quantity,
      purchaseDate: new Date(),
    });
    if(purchasePrice * stock.quantity > user.buyingPower ){
      return res.status(400).json({ error: "Insufficient buying power" });
    }
    else{
      user.buyingPower -= purchasePrice * stock.quantity;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sellStocks = async (req, res) => {
  const { ticker, quantity, sellPrice } = req.body;

  if (!ticker || !quantity || !sellPrice) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(req.user._id);

    let totalQuantity = 0;
    user.portfolio.forEach((stock) => {
      if (stock.ticker === ticker) {
        totalQuantity += stock.quantity;
      }
    });

    if (totalQuantity < quantity) {
      return res.status(400).json({ error: "Not enough stock to sell" });
    }

    let remainingQuantity = quantity;
    let updatedPortfolio = [];

    for (let i = 0; i < user.portfolio.length; i++) {
      let stock = user.portfolio[i];
      if (stock.ticker === ticker) {
        if (stock.quantity >= remainingQuantity) {
          stock.quantity -= remainingQuantity;
          remainingQuantity = 0;
        } else {
          remainingQuantity -= stock.quantity;
          stock.quantity = 0;
        }
      }
      if (stock.quantity > 0) {
        updatedPortfolio.push(stock);
      }
    }
    user.buyingPower += quantity * sellPrice;
    user.portfolio = updatedPortfolio;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPortfolio = async (req, res) => {
  try {
    console.log("Fetching portfolio for user ID:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User found:", user);
    return res.status(200).json(user.portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(400).json({ error: error.message });
  }
};

const getBuyingPower = async (req, res) => {
  try {
    console.log("Fetching buying power for user ID:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let buyingPower = user.buyingPower
    console.log("Calculated buying power:", buyingPower);
    res.status(200).json({ buyingPower });
  } catch (error) {
    console.error("Error fetching buying power:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { buyStocks, sellStocks, getPortfolio, getBuyingPower };

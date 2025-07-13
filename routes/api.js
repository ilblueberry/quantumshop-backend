const express = require("express");
const router = express.Router();
const DecisionHistory = require("../models/DecisionHistory");

// ✅ Add this route to send product list to frontend
router.get("/products", (req, res) => {
  res.json([
    { name: "Ergonomic Chair", price: 299, category: "Furniture" },
    { name: "Planner", price: 20, category: "Stationery" },
    { name: "Knife Set", price: 89, category: "Kitchen" },
    { name: "Smart Bulbs", price: 45, category: "Electronics" },
    { name: "Fruit Basket", price: 35, category: "Food" }
  ]);
});

// 💡 Existing logic — leave this unchanged
router.post("/analyze-decision", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const product = req.body.product;

  const generateOutcome = (item) => {
    let outcome = { health: 0, finance: 0, career: 0, happiness: 0 };

    if (item.category === "Furniture") {
      outcome.health = item.price >= 2000 ? 4 : -2;
      outcome.career = item.price >= 2000 ? 3 : 0;
    } else if (item.category === "Stationery") {
      outcome.career = item.name.includes("Planner") ? 5 : 1;
    } else if (item.category === "Food") {
      outcome.health = -3;
    } else if (item.category === "Kitchen") {
      outcome.health = 3;
      outcome.happiness = 2;
    }

    outcome.finance = item.price <= 500 ? 3 : -2;
    outcome.happiness += Math.floor(Math.random() * 3);

    return outcome;
  };

  const scenario1 = {
    product: product.name,
    outcome: generateOutcome(product)
  };

  const scenario2 = {
    product: "Alternate Life Path",
    outcome: {
      health: 2,
      finance: 2,
      career: 2,
      happiness: 3
    }
  };

  const history = new DecisionHistory({
    user: req.user.email,
    product: product,
    result: [scenario1, scenario2],
    timestamp: new Date()
  });

  await history.save();
  res.json({ scenario1, scenario2 });
});

router.get("/decision-history", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const data = await DecisionHistory.find({ user: req.user.email })
    .sort({ timestamp: -1 })
    .limit(5);

  res.json(data);
});

module.exports = router;

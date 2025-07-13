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

router.get("/decision-history", async (req, res) => {
  // Step 1: Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Step 2: Fetch decisions belonging to this specific user
  const data = await DecisionHistory.find({ user: req.user.email })
    .sort({ timestamp: -1 })
    .limit(5);

  // Step 3: Send the data
  res.json(data);
});

  await history.save();
  res.json({ scenario1, scenario2 });
});

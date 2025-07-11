const express = require('express');
const router = express.Router();

const products = [
  {
    id: "p001",
    name: "Ergonomic Chair",
    price: 299,
    category: "Furniture",
    image: "https://example.com/chair.jpg"
  },
  {
    id: "p002",
    name: "Premium Notebook",
    price: 19,
    category: "Stationery",
    image: "https://example.com/notebook.jpg"
  },
  {
    id: "p003",
    name: "Cooking Pan Set",
    price: 99,
    category: "Kitchen",
    image: "https://example.com/cooking.jpg"
  }
];

router.get('/products', (req, res) => {
  res.json(products);
});

module.exports = router;

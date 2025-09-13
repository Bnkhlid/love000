const express = require('express');
const router = express.Router();

// In-memory cart storage (replace with a database in production)
let carts = {};

// Get cart by userId
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(carts[userId] || []);
});

// Add or update cart for userId
router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { cartItems } = req.body;
  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ message: 'cartItems must be an array.' });
  }
  carts[userId] = cartItems;
  res.json({ message: 'Cart updated successfully.' });
});

// Delete a product from the cart
router.delete('/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  if (!carts[userId]) return res.status(404).json({ message: 'Cart not found.' });
  carts[userId] = carts[userId].filter(item => String(item.productId) !== String(productId));
  res.json({ message: 'Product removed from cart.' });
});

module.exports = router;
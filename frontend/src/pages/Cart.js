import React, { useState } from 'react';
import '../App.css';

const initialCart = [
  { id: 1, name: 'Red Rose Bouquet', price: 100, quantity: 2 },
  { id: 2, name: 'Mixed Flowers Bouquet', price: 120, quantity: 1 },
];

function Cart() {
  const [cart, setCart] = useState(initialCart);

  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Your order has been placed! Thank you for shopping with us 🌸');
    setCart([]);
  };

  return (
    <div className="container">
      <div className="flower-icon" style={{ fontSize: 55 }}>🛒🌹</div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="success">Your cart is empty! Add your favorite bouquets 💐</div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>🌺 {item.name}</td>
                  <td>{item.price} SAR</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      style={{ width: 40 }}
                    />
                  </td>
                  <td>{item.price * item.quantity} SAR</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} style={{ background: '#ffebee' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
            Grand Total: <span style={{ color: '#c2185b' }}>{total} SAR</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout 🌷
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
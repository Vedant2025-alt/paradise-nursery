import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';
import './CartItem.css';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="#d9ecd3"/><text x="50%" y="62%" font-size="50" text-anchor="middle">🪴</text></svg>'
  );

const CartItem = ({ onNavigate }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const itemTotal = (item) => item.cost * item.quantity;
  const calculateTotalAmount = () => items.reduce((sum, i) => sum + itemTotal(i), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // quantity would hit 0
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleCheckout = () => setMessage('Checkout is Coming Soon! 🌱');

  return (
    <div>
      <Navbar onNavigate={onNavigate} current="cart" />
      <div className="cart-container">
        <h2 className="cart-heading">Your Shopping Cart</h2>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button className="btn btn-primary" onClick={() => onNavigate('plants')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <h3 className="total-amount">Total Cart Amount: ${calculateTotalAmount()}</h3>

            {items.map((item) => (
              <div className="cart-item" key={item.name}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }}
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit price: ${item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="qty-btn" aria-label={`Decrease ${item.name}`} onClick={() => handleDecrement(item)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" aria-label={`Increase ${item.name}`} onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Subtotal: ${itemTotal(item)}</div>
                </div>
                <button className="btn btn-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            ))}

            {message && <div className="coming-soon">{message}</div>}

            <div className="cart-actions">
              <button className="btn btn-secondary" onClick={() => onNavigate('plants')}>
                Continue Shopping
              </button>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;

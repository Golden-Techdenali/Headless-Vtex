import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CartPages() {
  const location = useLocation();
  const { orderFormId } = location.state || {};  // Get the orderFormId from the navigation state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderFormId) {
      setError('No orderFormId available.');
      setLoading(false);
      return;
    }

    const fetchCartDetails = async () => {
      try {
        const response = await fetch(`/api/checkout/pub/orderForm/${orderFormId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart details');
        }

        const data = await response.json();
        const items = data.items || [];
        setCartItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [orderFormId]);

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <p>Order Form ID: {orderFormId}</p>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Product ID: {item.productId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPages;

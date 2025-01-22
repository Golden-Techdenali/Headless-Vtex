import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CartPages() {
  const location = useLocation();
  const { orderFormId } = location.state || {};
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [zipcode, setZipcode] = useState('');
  const [countrycode, setCountrycode] = useState('');
  const [pickupPoints, setPickupPoints] = useState([]);
  const [pickupError, setPickupError] = useState(null);

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

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setZipcode('');
    setCountrycode('');
    setPickupPoints([]);
    setPickupError(null);
  };

  const handleSearchPickupPoint = async () => {
    if (!zipcode || !countrycode) {
      setPickupError('Please provide both zipcode and country code.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pickup-points?postalCode=${zipcode}&countryCode=${countrycode}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pickup points');
      }

      const data = await response.json();
      const pointsArray = Array.isArray(data) ? data : [data];
      setPickupPoints(pointsArray);
      setPickupError(null);
    } catch (err) {
      console.error('Error fetching pickup points:', err.message);
      setPickupPoints([]);
      setPickupError(err.message);
    }
  };

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
            <button onClick={handleButtonClick}>Open Popup</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Enter Details</h2>
            <label>
              Zipcode:
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </label>
            <br />
            <label>
              Countrycode:
              <input
                type="text"
                value={countrycode}
                onChange={(e) => setCountrycode(e.target.value)}
              />
            </label>
            <br />
            <button onClick={handleSearchPickupPoint}>Search Pickup Point</button>
            <button onClick={handleClosePopup}>Close</button>
            {pickupError && <p style={{ color: 'red' }}>{pickupError}</p>}
            {pickupPoints.length > 0 && (
              <div className="pickup-points-container">
              <h3>Pickup Points:</h3>
              <ul className="pickup-points-list">
                {pickupPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="pickup-point-card">
                    
                    <ul className="pickup-point-items-list">
                      {point.items && Array.isArray(point.items) ? (
                        point.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="pickup-item">
                            <strong>Item {itemIndex + 1}:</strong>
                            <p>
                              <strong>Friendly Name:</strong> {item.pickupPoint?.friendlyName || 'N/A'}
                            </p>
                            <p>
                              <strong>Street:</strong> {item.pickupPoint?.address?.street || 'N/A'}
                            </p>
                            <p>
                              <strong>City:</strong> {item.pickupPoint?.address?.city || 'N/A'}
                            </p>
                           
                            <p>
                              <strong>Distance:</strong> {item.distance || 'N/A'} km
                            </p>
                          </li>
                        ))
                      ) : (
                        <li className="no-items">No items available</li>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            
            
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPages;

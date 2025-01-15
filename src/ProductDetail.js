import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { VtexAppKey, VtexAppToken } from './constants';

const API_URL = '/api/catalog/pvt/product/';
const CREATE_CART_URL = '/api/checkout/pub/orderForm';
const ADD_TO_CART_URL = '/api/checkout/pub/orderForm/{orderFormId}/items';
const productPrices = {
  1: 49.99,
  2: 79.99,
  3: 99.99,
};
const productImages = {
  1: require('./images/product1.jpg'),
  2: require('./images/product2.jpg'),
  3: require('./images/product3.jpg'),
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  const navigate = useNavigate();  // Initialize navigate hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': VtexAppKey,
            'X-VTEX-API-AppToken': VtexAppToken,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch product details');

        const data = await response.json();
        setProduct({
          id,
          name: data.Name,
          description: data.Description,
          image: productImages[id] || null,
          price: productPrices[id] || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setCartLoading(true);
    setCartError(null);

    try {
      // Step 1: Create a new order form (cart)
      const createCartResponse = await fetch(CREATE_CART_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': VtexAppKey,
          'X-VTEX-API-AppToken': VtexAppToken,
        },
      });

      if (!createCartResponse.ok) throw new Error('Failed to create order form');

      const createCartData = await createCartResponse.json();
      const { orderFormId } = createCartData;

      // Step 2: Add product to the cart
      const addToCartResponse = await fetch(ADD_TO_CART_URL.replace('{orderFormId}', orderFormId), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': VtexAppKey,
          'X-VTEX-API-AppToken': VtexAppToken,
        },
        body: JSON.stringify({
          orderItems: [
            {
              quantity: 3,
              seller: '1',
              id: product.id,
              index: 0,
              price: product.price,
            },
          ],
        }),
      });

      if (!addToCartResponse.ok) throw new Error('Failed to add product to cart');

      // Optionally, handle the response if needed
      const addToCartData = await addToCartResponse.json();
      console.log('Product added to cart:', addToCartData);

      // Step 3: Redirect to cart page with the orderFormId
      navigate('/cart', { state: { orderFormId } });  // Pass the orderFormId in the navigation state
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-detail">
      {product && (
        <>
          <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>

          <button onClick={handleAddToCart} disabled={cartLoading}>
            {cartLoading ? 'Adding to cart...' : 'Add to Cart'}
          </button>

          {cartError && <div style={{ color: 'red' }}>Error: {cartError}</div>}
        </>
      )}
    </div>
  );
}

export default ProductDetail;

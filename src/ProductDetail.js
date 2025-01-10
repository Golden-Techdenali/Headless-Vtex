import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VtexAppKey, VtexAppToken } from './constants';


const API_URL_1 = '/api/catalog/pvt/product/';
const productPrices = {
  1: 49.99,
  2: 79.99,
  3: 99.99,
}; // Prices for the products

const productImages = {
  1: require('./images/product2.jpg'), // Replace with actual local image paths
  2: require('./images/product3.jpg'),
  3: require('./images/product1.jpg'),
};

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken
      };

      try {
        const response = await fetch(`${API_URL_1}${id}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();

        setProduct({
          id,
          name: data.Name,
          image: productImages[id] || null,
          description: data.description,
          price: productPrices[id] || 0, // Fetch the price dynamically
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id, VtexAppKey, VtexAppToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-detail">
      {product && (
        <>
          <img src={product.image} alt={product.name} style={{width: '300px', height: '300px'}} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}

export default ProductDetail;

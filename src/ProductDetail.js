import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VtexAppKey, VtexAppToken } from './constants';

const API_URL = '/api/catalog/pvt/product/';
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
        </>
      )}
    </div>
  );
}

export default ProductDetail;

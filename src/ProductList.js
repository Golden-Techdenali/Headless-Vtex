import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = [1, 2, 3];

      try {
        const fetchedProducts = await Promise.all(
          productIds.map(async (id) => {
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
            return {
              id,
              name: data.Name,
              image: productImages[id] || null,
              price: productPrices[id] || 0,
            };
          })
        );

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

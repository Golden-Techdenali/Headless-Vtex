import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL_1 = '/api/catalog/pvt/product/'; // For name and image

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkM1OUNBREY1OTBDRUYwODUyODhFNkQ0NUM0NTlDOUYwNDM4RTg0RkQiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZTgxZTE5ZGEtNmIzZS00YWQ1LWJhMzUtZjllMmFmM2Q4ODkxIiwiZXhwIjoxNzM2NDMwNjk2LCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjM0NDI5NiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIwY2QyNTUxMC0xMmExLTRlOTQtOWJiMC1lMzEyM2JjYjdjMWUifQ.xTmQ1WYXDldlDIG1vDKHAy2xk_5i087h3uUPfMKkCJkQ8NGqJJXacDp6kc2TJjWs7iokssqUBMVWBCxVGaLcFQ'; // Replace with your actual token

  const productPrices = {
    1: 49.99,
    2: 79.99,
    3: 99.99,
  };

  useEffect(() => {
    const fetchProductData = async (productId) => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'VtexIdclientAutCookie': token,
      };

      try {
        const response = await fetch(`${API_URL_1}${productId}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();

        const product = {
          id: productId,
          name: data.Name,
          image: data.image,
          price: productPrices[productId] || 0,
        };

        setProducts((prevProducts) => [...prevProducts, product]);
      } catch (err) {
        setError(err.message);
      }
    };

    const productIds = [1, 2, 3]; // Add your product IDs
    productIds.forEach((productId) => fetchProductData(productId));
    setLoading(false);
  }, [token]);

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

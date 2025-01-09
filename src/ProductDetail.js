import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL_1 = '/api/catalog/pvt/product/';
const productPrices = {
  1: 49.99,
  2: 79.99,
  3: 99.99,
}; // Prices for the products

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkM1OUNBREY1OTBDRUYwODUyODhFNkQ0NUM0NTlDOUYwNDM4RTg0RkQiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZTgxZTE5ZGEtNmIzZS00YWQ1LWJhMzUtZjllMmFmM2Q4ODkxIiwiZXhwIjoxNzM2NDMwNjk2LCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjM0NDI5NiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIwY2QyNTUxMC0xMmExLTRlOTQtOWJiMC1lMzEyM2JjYjdjMWUifQ.xTmQ1WYXDldlDIG1vDKHAy2xk_5i087h3uUPfMKkCJkQ8NGqJJXacDp6kc2TJjWs7iokssqUBMVWBCxVGaLcFQ'; // Replace with your actual token

  useEffect(() => {
    const fetchProductDetail = async () => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'VtexIdclientAutCookie': token,
      };

      try {
        const response = await fetch(`${API_URL_1}${id}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();

        setProduct({
          id,
          name: data.Name,
          image: data.image,
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
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-detail">
      {product && (
        <>
          <img src={product.image} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}

export default ProductDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL_1 = '/api/catalog/pvt/product/';

  // Local image paths mapping
  const productImages = {
    1: require('./images/product1.jpg'), 
    2: require('./images/product2.jpg'),
    3: require('./images/product3.jpg'),
  };
const productPrices = {
  1: 49.99,
  2: 79.99,
  3: 99.99,
}; 

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjBDMjdDRDE1RDRCRTkwMEVGQjREMkUwMjI2ODgzNDNBQjRERDFEQTAiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiODUxMjI0NjItZTEyOC00MjZmLTlhNzYtZWRmNTVlMDZiMzNkIiwiZXhwIjoxNzM2NTE4OTAyLCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjQzMjUwMiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI1YmUzZTQ0MS1iYzJlLTRkZTgtOGY4Ni0wZDNjNzk0OTg4MGIifQ.tNRWZ6zSkyIeq54R63wWiuDByLx7jr7vA7neFngdvahLH6U9w6DNW8YDBUn4fgz2KlfvEy3XwpmqhaIb4Lqh5g'; 

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
          image: productImages[id] || null,
          description: data.description,
          price: productPrices[id] || 0, 
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

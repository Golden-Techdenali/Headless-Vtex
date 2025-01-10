import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


  // Local image paths mapping
  const productImages = {
    1: require('./images/product1.jpg'), 
    2: require('./images/product2.jpg'),
    3: require('./images/product3.jpg'),
  };

const API_URL_1 = '/api/catalog/pvt/product/'; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjBDMjdDRDE1RDRCRTkwMEVGQjREMkUwMjI2ODgzNDNBQjRERDFEQTAiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiODUxMjI0NjItZTEyOC00MjZmLTlhNzYtZWRmNTVlMDZiMzNkIiwiZXhwIjoxNzM2NTE4OTAyLCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjQzMjUwMiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI1YmUzZTQ0MS1iYzJlLTRkZTgtOGY4Ni0wZDNjNzk0OTg4MGIifQ.tNRWZ6zSkyIeq54R63wWiuDByLx7jr7vA7neFngdvahLH6U9w6DNW8YDBUn4fgz2KlfvEy3XwpmqhaIb4Lqh5g'; 


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
          image: productImages[productId] || null, 
          price: productPrices[productId] || 0,
        };

        setProducts((prevProducts) => [...prevProducts, product]);
      } catch (err) {
        setError(err.message);
      }
    };

    const productIds = [1, 2, 3]; 
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

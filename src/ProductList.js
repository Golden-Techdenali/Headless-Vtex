import React, { useState, useEffect } from 'react';

// Sample API base URLs (Replace with actual API URLs)
const API_URL_1 = '/api/catalog/pvt/product/'; // For name and image
//const API_URL_2 = '/pricing/prices/'; // For price

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkJFM0M3MjRFOUE0OENDNTBGNkJDNkMxRTBGRTEwQ0NCQjA2QzQ2RUUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJnb2xkZW4ua3VtYXJAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZDU3ZTkxNGMtYTI0OS00MjUxLWFiNmEtNDg0YzRlMjg4Y2EwIiwiZXhwIjoxNzM2MzQyOTQzLCJ0eXBlIjoidXNlciIsInVzZXJJZCI6IjczMzc0NjE1LWFjY2QtNDQxNi1iZjQzLWM2NjI3NzQyOTMyMiIsImlhdCI6MTczNjI1NjU0MywiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI4ZGRiMjE3YS0zZWY0LTQwOGUtOGU1My00MTc5NTY2NWUxMzQifQ.gNTBfpjjaFodWiLYsnNzyuNPr36KZGZh35RHBKx2JXdRTzkKrXUy6WaEU9fL3nnv1ZZtseCv4T0pv2Eqfy7BCA'; // Replace with your actual token

  useEffect(() => {
    const fetchProductData = async (productId) => {
      // Headers for API calls
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'VtexIdclientAutCookie': token
      };

      try {
        // Fetch product details (name and image) from the first API
        const detailsResponse = await fetch(`${API_URL_1}${productId}`, { headers });
        if (!detailsResponse.ok) throw new Error('Failed to fetch product details');
        const detailsData = await detailsResponse.json();

        // Fetch price from the second API
        //const priceResponse = await fetch(`${API_URL_2}${productId}`, { headers });
        //if (!priceResponse.ok) throw new Error('Failed to fetch product price');
        //const priceData = await priceResponse.json();

        // Combine the details and price data into a single object
        const product = {
          id: productId,
          name: detailsData.Name,
          image: detailsData.image,
          //price: priceData.listPrice
        };

        // Add the product to the state
        setProducts(prevProducts => [...prevProducts, product]);
      } catch (err) {
        setError(err.message);
      }
    };

    // Example product IDs (Replace with actual product IDs)
    const productIds = [1, 2, 3]; // Replace with dynamic IDs

    // Fetch data for each product ID
    productIds.forEach(productId => {
      fetchProductData(productId);
    });

    setLoading(false); // Set loading to false once fetching is complete
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            {/* <p>Price: ${product.price}</p> */}
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;

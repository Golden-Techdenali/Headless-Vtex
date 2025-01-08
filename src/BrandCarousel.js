// src/BrandCarousel.js
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const BrandCarousel = () => {
  const [brands, setBrands] = useState([]);

  // Fetch data from an API
  useEffect(() => {
   const fetchBrands = async () => {
      try {
        const apiUrl = '/api/catalog_system/pvt/brand/list'; // Use relative URL
        const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkJFM0M3MjRFOUE0OENDNTBGNkJDNkMxRTBGRTEwQ0NCQjA2QzQ2RUUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJnb2xkZW4ua3VtYXJAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZDU3ZTkxNGMtYTI0OS00MjUxLWFiNmEtNDg0YzRlMjg4Y2EwIiwiZXhwIjoxNzM2MzQyOTQzLCJ0eXBlIjoidXNlciIsInVzZXJJZCI6IjczMzc0NjE1LWFjY2QtNDQxNi1iZjQzLWM2NjI3NzQyOTMyMiIsImlhdCI6MTczNjI1NjU0MywiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI4ZGRiMjE3YS0zZWY0LTQwOGUtOGU1My00MTc5NTY2NWUxMzQifQ.gNTBfpjjaFodWiLYsnNzyuNPr36KZGZh35RHBKx2JXdRTzkKrXUy6WaEU9fL3nnv1ZZtseCv4T0pv2Eqfy7BCA';

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'VtexIdclientAutCookie': token,
          },
        });
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div>
      <Carousel>
        {brands.map((brand, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={brand.imageUrl} // Assuming API returns image URL
              alt={brand.name}
            />
            <Carousel.Caption>
              <h3>{brand.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BrandCarousel;

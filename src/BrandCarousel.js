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
        const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjM2NkQxNTA0MzJBQjRCMzA1QzFBNzk1NUE2NjY2QTBFQTE5REJBOTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJnb2xkZW4ua3VtYXJAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiYzRhZjgxZjQtNDRiYy00MTQ1LTk2NmEtN2U2NDI0MzhmNWFjIiwiZXhwIjoxNzM2MjU1MDk0LCJ0eXBlIjoidXNlciIsInVzZXJJZCI6IjczMzc0NjE1LWFjY2QtNDQxNi1iZjQzLWM2NjI3NzQyOTMyMiIsImlhdCI6MTczNjE2ODY5NCwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiJjOWM0MjYyMC1hMjk1LTQzZjctYmQ1My0wM2ZlODUzMDk0NGEifQ.9diZHGHDDf7tLX1uaU1p-g1K229XkAVPg3udqvITDLWEQ8fo-rorgZ3STh2eD8jXsXxTbVJiLNBwFYGHMEGb_g';

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
        <h1>Shiva</h1>
      </Carousel>
    </div>
  );
};

export default BrandCarousel;

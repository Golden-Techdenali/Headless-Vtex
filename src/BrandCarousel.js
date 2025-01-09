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
        const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkM1OUNBREY1OTBDRUYwODUyODhFNkQ0NUM0NTlDOUYwNDM4RTg0RkQiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZTgxZTE5ZGEtNmIzZS00YWQ1LWJhMzUtZjllMmFmM2Q4ODkxIiwiZXhwIjoxNzM2NDMwNjk2LCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjM0NDI5NiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIwY2QyNTUxMC0xMmExLTRlOTQtOWJiMC1lMzEyM2JjYjdjMWUifQ.xTmQ1WYXDldlDIG1vDKHAy2xk_5i087h3uUPfMKkCJkQ8NGqJJXacDp6kc2TJjWs7iokssqUBMVWBCxVGaLcFQ';

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

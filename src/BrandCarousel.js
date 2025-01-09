import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const BrandCarousel = () => {
  const [brands, setBrands] = useState([]);

  
  const brandImages = {
    1: require('./images/brand1.jpg'),
    2: require('./images/brand2.jpg'),
    3: require('./images/brand3.jpg'),
    4: require('./images/brand4.jpg'),
    5: require('./images/brand5.jpg'),
    6: require('./images/brand6.jpg'),
    7: require('./images/brand7.jpg'),
    8: require('./images/brand8.jpg'),
    9: require('./images/brand9.jpg'),
  };

  
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const apiUrl = '/api/catalog_system/pvt/brand/list'; 
        const token =
          'eyJhbGciOiJFUzI1NiIsImtpZCI6IkM1OUNBREY1OTBDRUYwODUyODhFNkQ0NUM0NTlDOUYwNDM4RTg0RkQiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiZTgxZTE5ZGEtNmIzZS00YWQ1LWJhMzUtZjllMmFmM2Q4ODkxIiwiZXhwIjoxNzM2NDMwNjk2LCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjM0NDI5NiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIwY2QyNTUxMC0xMmExLTRlOTQtOWJiMC1lMzEyM2JjYjdjMWUifQ.xTmQ1WYXDldlDIG1vDKHAy2xk_5i087h3uUPfMKkCJkQ8NGqJJXacDp6kc2TJjWs7iokssqUBMVWBCxVGaLcFQ'; // Replace with your actual token

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            VtexIdclientAutCookie: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }

        const data = await response.json();

       
        const combinedData = data.map((brand) => ({
          ...brand,
          imageUrl: brandImages[brand.id], 
        }));

        setBrands(combinedData);
      } catch (error) {
        console.error('Error fetching brands:', error);

        
        const localFallback = Object.keys(brandImages).map((key) => ({
          id: parseInt(key),
          name: `Brand ${key}`, 
          imageUrl: brandImages[key],
        }));

        setBrands(localFallback);
      }
    };

    fetchBrands();
  }, []); 

  return (
    <div>
      <Carousel>
        {brands.map((brand, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={brand.imageUrl} 
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

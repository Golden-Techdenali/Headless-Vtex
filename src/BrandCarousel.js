import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { VtexAppKey, VtexAppToken } from './constants';

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
        const apiUrl = '/api/brands'; 
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': VtexAppKey,
            'X-VTEX-API-AppToken': VtexAppToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }

        const data = await response.json();

        // Combine brand data with the image URLs
        const combinedData = data.map((brand) => ({
          ...brand,
          imageUrl: brandImages[brand.id], 
        }));

        setBrands(combinedData);
      } catch (error) {
        console.error('Error fetching brands:', error);

        // Fallback to local images if fetch fails
        const localFallback = Object.keys(brandImages).map((key) => ({
          id: parseInt(key),
          name: `Brand ${key}`, 
          imageUrl: brandImages[key],
        }));

        setBrands(localFallback);
      }
    };

    fetchBrands();
  }, []); // No need to add brandImages in the dependency array since it's a constant

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

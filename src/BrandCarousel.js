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
          'eyJhbGciOiJFUzI1NiIsImtpZCI6IjBDMjdDRDE1RDRCRTkwMEVGQjREMkUwMjI2ODgzNDNBQjRERDFEQTAiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJsYWxpdGhrdW1hci52b2RhbGFAdGVjaGRlbmFsaS5jb20iLCJhY2NvdW50IjoidGVjaGRlbmFsaXBhcnRuZXJ1cyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiODUxMjI0NjItZTEyOC00MjZmLTlhNzYtZWRmNTVlMDZiMzNkIiwiZXhwIjoxNzM2NTE4OTAyLCJ0eXBlIjoidXNlciIsInVzZXJJZCI6ImNiOWU0YTY4LWNlZjAtNGJjYS04NGMyLTIxYjVmNDZjYzU4MCIsImlhdCI6MTczNjQzMjUwMiwiaXNSZXByZXNlbnRhdGl2ZSI6ZmFsc2UsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI1YmUzZTQ0MS1iYzJlLTRkZTgtOGY4Ni0wZDNjNzk0OTg4MGIifQ.tNRWZ6zSkyIeq54R63wWiuDByLx7jr7vA7neFngdvahLH6U9w6DNW8YDBUn4fgz2KlfvEy3XwpmqhaIb4Lqh5g'; // Replace with your actual token

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

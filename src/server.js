const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { VtexAppKey, VtexAppToken } = require('./constants');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const API_URL = 'https://techdenalipartnerus.vtexcommercestable.com.br';
const PRICE_API_URL = 'https://api.vtex.com/techdenalipartnerus/pricing/prices/';
const CREATE_CART_URL = `${API_URL}/api/checkout/pub/orderForm`;
const ADD_TO_CART_URL = `${API_URL}/api/checkout/pub/orderForm/{orderFormId}/items`;

app.use(express.json());

// Enable CORS for the frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint to fetch brand list
app.get('/api/brands', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/catalog_system/pvt/brand/list`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching brand list:', error);
    res.status(500).json({ error: 'Failed to fetch brand list' });
  }
});

// Endpoint to fetch product details and price
app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const productResponse = await axios.get(`${API_URL}/api/catalog/pvt/product/${id}`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    const priceResponse = await axios.get(`${PRICE_API_URL}${id}`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    const product = {
      id,
      name: productResponse.data.Name,
      description: productResponse.data.Description,
      price: priceResponse.data.basePrice || 0,
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// Endpoint to create a cart
app.post('/api/cart', async (req, res) => {
  try {
    const response = await axios.post(
      CREATE_CART_URL,
      {},
      {
        headers: {
          'X-VTEX-API-AppKey': VtexAppKey,
          'X-VTEX-API-AppToken': VtexAppToken,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
});

// Endpoint to add items to a cart
app.post('/api/cart/:orderFormId/add', async (req, res) => {
  const { orderFormId } = req.params;
  const { orderItems } = req.body;

  if (!orderItems || !Array.isArray(orderItems)) {
    return res.status(400).json({ error: 'Invalid or missing orderItems in the request body' });
  }

  try {
    const response = await axios.post(
      ADD_TO_CART_URL.replace('{orderFormId}', orderFormId),
      { orderItems },
      {
        headers: {
          'X-VTEX-API-AppKey': VtexAppKey,
          'X-VTEX-API-AppToken': VtexAppToken,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error adding items to cart:', error);
    res.status(500).json({ error: 'Failed to add items to cart' });
  }
});

// Endpoint to fetch cart details by orderFormId
app.get('/api/checkout/pub/orderForm/:orderFormId', async (req, res) => {
  const { orderFormId } = req.params;

  try {
    const response = await axios.get(`${API_URL}/api/checkout/pub/orderForm/${orderFormId}`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching cart details for orderFormId: ${orderFormId}`, error);
    res.status(500).json({ error: 'Failed to fetch cart details' });
  }
});

// Endpoint to fetch pickup points
app.get('/api/pickup-points', async (req, res) => {
  const { postalCode, countryCode } = req.query;

  console.log('Received query parameters:', { postalCode, countryCode });

  if (!postalCode || !countryCode) {
    console.error('Missing parameters');
    return res.status(400).json({ error: 'postalCode and countryCode are required.' });
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/checkout/pub/pickup-points?postalCode=${postalCode}&countryCode=${countryCode}`
    );

    console.log('Pickup Points Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching pickup points:', error.message);
    res.status(500).json({ error: 'Failed to fetch pickup points.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

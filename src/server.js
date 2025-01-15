const { VtexAppKey, VtexAppToken } = require('./constants');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const API_URL = 'https://techdenalipartnerus.vtexcommercestable.com.br';
const PRICE_API_URL = 'https://api.vtex.com/techdenalipartnerus/pricing/prices/';
const CREATE_CART_URL = `${API_URL}/api/checkout/pub/orderForm`;
const ADD_TO_CART_URL = `${API_URL}/api/checkout/pub/orderForm/{orderFormId}/items`;
app.use(express.json());
app.get('/api/brands', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/catalog_system/pvt/brand/list`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    // Send back the brand list to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching brand list:', error);
    res.status(500).json({ error: 'Failed to fetch brand list' });
  }
});

app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch product details
    const productResponse = await axios.get(`${API_URL}/api/catalog/pvt/product/${id}`, {
      headers: {
        'X-VTEX-API-AppKey': VtexAppKey,
        'X-VTEX-API-AppToken': VtexAppToken,
      },
    });

    // Fetch product price
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
      price: priceResponse.data.basePrice || 0, // Adjust based on actual response structure
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});
app.post('/api/cart', async (req, res) => {
  try {
    const response = await axios.post(
      CREATE_CART_URL,
      {}, // No body is required for creating an order form
      {
        headers: {
          'X-VTEX-API-AppKey': VtexAppKey,
          'X-VTEX-API-AppToken': VtexAppToken,
        },
      }
    );

    res.json(response.data); // Return the created order form data
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

    // Return the order form details
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching cart details for orderFormId: ${orderFormId}`, error);
    res.status(500).json({ error: 'Failed to fetch cart details' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
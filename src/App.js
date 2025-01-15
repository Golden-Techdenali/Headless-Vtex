import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandCarousel from './BrandCarousel';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail'; // Import your PDP component
import CartPages from './CartPages';

function App() {
  const location = useLocation(); // Hook to determine the current route

  return (
    <div className="App">
      <div className="container text-center my-4">
        <h1 className="display-4">Brand Showcase</h1>
        <h2 className="text-muted">Techdenali</h2>
      </div>

      {/* Render BrandCarousel only on the home page */}
      {location.pathname === '/' && (
        <div className="brandcarousel mb-5">
          <BrandCarousel />
        </div>
      )}

      <div className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPages />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

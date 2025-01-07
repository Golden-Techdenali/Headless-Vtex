import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandCarousel from './BrandCarousel';

function App() {
  return (
    <div className="App">
      <h1>Brand Showcase</h1>
      <BrandCarousel />
    </div>
  );
}

export default App;

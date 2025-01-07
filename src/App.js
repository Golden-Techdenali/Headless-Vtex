import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandCarousel from './BrandCarousel';

function App() {
  return (
    <div className="App">
    <div className='container texts'>
    <h1>Brand Showcase</h1>
    <h1>Techdenali</h1>
    </div>
    <div className='brandcarousel'> <BrandCarousel /></div>
  </div>
  );
}

export default App;

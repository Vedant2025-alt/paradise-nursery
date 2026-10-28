import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'plants' | 'cart'

  if (page === 'plants') return <ProductList onNavigate={setPage} />;
  if (page === 'cart') return <CartItem onNavigate={setPage} />;

  return (
    <div className="app-container">
      <div className="landing-page">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => setPage('plants')}>
            Get Started
          </button>
        </div>
        <div className="about-us-container">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default App;

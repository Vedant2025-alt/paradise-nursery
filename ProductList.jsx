import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220"><rect width="100%" height="100%" fill="#d9ecd3"/><text x="50%" y="55%" font-size="80" text-anchor="middle">🪴</text></svg>'
  );
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;

export const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: u('photo-1593482892290-f54927ae1bb6'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: u('photo-1572688484438-313a6e50c333'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: u('photo-1593691509543-c55fb32d8de5'), description: 'Removes mold spores and elegant white blooms.', cost: 18 },
      { name: 'Boston Fern', image: u('photo-1598880940371-c756e015fea1'), description: 'Adds humidity and filters indoor air pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: u('photo-1637967886160-fd78dc3ce3f5'), description: 'Glossy leaves that absorb airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: u('photo-1509423350716-97f9360b4e09'), description: 'Purifies air and soothes burns and skin.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: u('photo-1611909023032-2d6b3134ecba'), description: 'Calming scent that promotes sleep and relaxation.', cost: 20 },
      { name: 'Jasmine', image: u('photo-1592729645009-b96d1e63d14b'), description: 'Sweet floral fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: u('photo-1515586000433-45406d8e6662'), description: 'Woody aroma, great for cooking and memory.', cost: 15 },
      { name: 'Mint', image: u('photo-1628556270448-4d4e4148e1b1'), description: 'Fresh, cooling scent for teas and cocktails.', cost: 12 },
      { name: 'Lemon Balm', image: u('photo-1599909533601-46c1bde4e6c2'), description: 'Lemony fragrance that reduces stress.', cost: 14 },
      { name: 'Gardenia', image: u('photo-1557429287-b2e26467fc2b'), description: 'Creamy white flowers with a rich perfume.', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Succulents',
    plants: [
      { name: 'Jade Plant', image: u('photo-1509587584298-0f3b3a3a1797'), description: 'Symbol of good luck; thrives on neglect.', cost: 16 },
      { name: 'Echeveria', image: u('photo-1459411552884-841db9b3cc2a'), description: 'Rosette-shaped succulent in soft pastel shades.', cost: 10 },
      { name: 'Zebra Haworthia', image: u('photo-1520412099551-62b6bafeb5bb'), description: 'Compact striped leaves, perfect for desks.', cost: 11 },
      { name: 'Burro\'s Tail', image: u('photo-1485955900006-10f4d324d411'), description: 'Trailing stems ideal for hanging baskets.', cost: 15 },
      { name: 'Panda Plant', image: u('photo-1446071103084-c257b5f70672'), description: 'Fuzzy silver leaves with chocolate tips.', cost: 13 },
      { name: 'Golden Barrel Cactus', image: u('photo-1459156212016-c812468e2115'), description: 'Round, sun-loving cactus with golden spines.', cost: 19 },
    ],
  },
];

export function Navbar({ onNavigate, current }) {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')}>
        🌿 Paradise Nursery
      </div>
      <div className="navbar-links">
        <a href="#home" className={current === 'home' ? 'active' : ''}
           onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
        <a href="#plants" className={current === 'plants' ? 'active' : ''}
           onClick={(e) => { e.preventDefault(); onNavigate('plants'); }}>Plants</a>
        <a href="#cart" className={`cart-link ${current === 'cart' ? 'active' : ''}`}
           onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
           aria-label="Cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count" data-testid="cart-count">{totalQuantity}</span>
          Cart
        </a>
      </div>
    </nav>
  );
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div>
      <Navbar onNavigate={onNavigate} current="plants" />
      <main className="product-grid-container">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <div className="product-card" key={plant.name}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }}
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${added ? 'added' : ''}`}
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;

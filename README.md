# Paradise Nursery 🌿

**Project name:** Paradise Nursery – Online Plant Shop (Shopping Cart Application)

A React + Redux Toolkit e-commerce front end where users browse houseplants by category, add them to a cart, and manage quantities and totals.

## Features
- Landing page with company name, background image, "Get Started" button and an About Us section
- Product listing: 3 categories × 6 plants, each with thumbnail, name, description and price
- "Add to Cart" button that adds the plant, disables itself afterwards and bumps the cart icon count
- Navbar (Home, Plants, Cart + live cart count) on the Product and Cart pages
- Cart page: thumbnail, name, unit price, per-plant subtotal, overall total, +/- quantity buttons, delete, Checkout ("Coming Soon") and Continue Shopping

## Tech stack
React 18, Redux Toolkit, React-Redux, Vite

## Project structure
```
src/
  main.jsx        entry, Redux Provider
  store.js        Redux store
  CartSlice.jsx   cart slice (addItem, removeItem, updateQuantity)
  App.jsx         landing page + simple page routing
  App.css         landing page background image + global styles
  AboutUs.jsx     company details
  ProductList.jsx plant catalogue + Navbar
  ProductList.css
  CartItem.jsx    shopping cart page
  CartItem.css
```

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy (optional)
`npm run build` then deploy `dist/` to GitHub Pages / Netlify.

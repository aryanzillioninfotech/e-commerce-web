import React from "react";
import { useCart } from "../context/CartContext";
import "./ProductsPage.scss";

const products = [
  { id: 1, name: "Nike Air Zoom", price: 2999 },
  { id: 2, name: "Minimalist Watch", price: 3499 },
  { id: 3, name: "Classic Tee", price: 1299 },
  { id: 4, name: "Nike Air Zoom", price: 2999 },
  { id: 5, name: "Minimalist Watch", price: 3499 },
  { id: 6, name: "Classic Tee", price: 1299 },
  { id: 7, name: "Nike Air Zoom", price: 2999 },
  { id: 8, name: "Minimalist Watch", price: 3499 },
  { id: 9, name: "Classic Tee", price: 1299 },
];

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="products-page">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
            <img src="public/133912508556466655.jpg" alt="" className="product-image"/>
          <h3 className="product-name">{p.name}</h3>
          <p className="product-price">₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;

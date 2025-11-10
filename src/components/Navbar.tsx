import React, { useState } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logo">ReCart</div>

        <div className="cart">
          <IconButton className="cart-btn" onClick={() => setOpen(true)}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;

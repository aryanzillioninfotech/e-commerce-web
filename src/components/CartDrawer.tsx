import React from "react";
import { Drawer, Box, Typography, Divider } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import "./CartDrawer.scss";

type Props = { open: boolean; onClose: () => void };

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { cart, increaseQty, decreaseQty } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="cart-drawer">
        <Typography className="cart-title">🛒 Your Cart</Typography>
        <Divider />

        {cart.length === 0 ? (
          <Typography sx={{ mt: 3 }}>No items in cart</Typography>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <div className="name">{item.name}</div>
                <div className="price">₹{item.price}</div>
              </div>

              <div className="qty">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>
          ))
        )}

        <Divider />
        <Typography className="total">Total: ₹{total.toFixed(2)}</Typography>

        {cart.length > 0 && (
          <div className="paypal">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(_, actions) =>
                actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: (total / 83).toFixed(2),
                      },
                    },
                  ],
                })
              }
              onApprove={async (_, actions) => {
                if (!actions.order) return;
                const details = await actions.order.capture();
                const name = details?.payer?.name?.given_name || "Customer";
                alert(`✅ Payment successful! Thank you, ${name}`);
                setTimeout(() => window.location.reload(), 1000);
                onClose();
              }}
            />
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;

import React, { createContext, useContext, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

type Product = {
    id: number;
    name: string;
    price: number;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                // return prev.map((item) =>
                //   item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                // );
                toast.error("Product Already In Cart")
                return prev
            } else {
                toast.success('Product Add Successfully!!')
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQty = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};

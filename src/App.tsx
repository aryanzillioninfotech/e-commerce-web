import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <CartProvider>
        <div><Toaster
          position="top-right"
          reverseOrder={false}
        /></div>
        <Navbar />
        <ProductsPage />
      </CartProvider>
    </PayPalScriptProvider>
  );
};

export default App;

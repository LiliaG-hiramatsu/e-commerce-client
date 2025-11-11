import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainLayout>
          <nav className="bg-gray-200 p-3 flex justify-between w-full">
            <Link to="/">Inicio</Link>
            <Link to="/cart">Carrito</Link>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

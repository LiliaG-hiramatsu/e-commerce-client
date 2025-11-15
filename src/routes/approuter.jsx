import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/home.jsx";
import CardPage from "../pages/card.jsx";
import CategoryPage from "../pages/category.jsx";
import SearchPage from "../pages/search.jsx";
import OrderSuccess from "../pages/orderSuccess.jsx";

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
      </Routes>
    </MainLayout>
  );
}


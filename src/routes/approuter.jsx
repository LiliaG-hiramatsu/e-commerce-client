import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/home.jsx";
import CardPage from "../pages/card.jsx";
import CategoryPage from "../pages/category.jsx";
import SearchPage from "../pages/search.jsx";

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </MainLayout>
  );
}


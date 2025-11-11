// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCard } from "../../contexts/cardContext";
import { useSearch } from "../../contexts/searchContext";
import data from "../../data.json";
import { useState } from "react";

export default function Navbar() {
  const { card } = useCard();
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const totalItems = card.reduce((sum, p) => sum + (p.cantidad || 0), 0);

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      navigate("/search");
      setSearchInput(""); // Limpiar input
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white gap-4">
      <Link to="/" className="text-xl font-bold whitespace-nowrap">E-Commerce C2-B</Link>

      <div className="relative group">
        <button className="px-4 py-2">Categorías ▼</button>
        <div className="absolute hidden group-hover:block bg-white text-black rounded shadow-lg z-10 w-48">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-200 font-semibold border-b whitespace-nowrap"
          >
            ✅ Todos los productos
          </Link>
          {data.categorias.map((categoria) => (
            <Link
              key={categoria.id}
              to={`/category/${categoria.id}`}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {categoria.nombre}
            </Link>
          ))}
        </div>
      </div>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-4 py-2 rounded-l text-black bg-gray-100 placeholder-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r"
        >
          🔍
        </button>
      </form>

      <Link to="/card" className="px-4 py-2 hover:underline flex items-center gap-2 whitespace-nowrap">
        🛒 Carrito ({totalItems})
      </Link>
    </nav>
  );
}

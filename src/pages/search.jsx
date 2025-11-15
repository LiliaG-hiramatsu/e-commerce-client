import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/searchContext";
import ProductCard from "../components/productCard.jsx";

export default function SearchPage() {
  const { searchQuery } = useSearch();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  // Filtrar productos por búsqueda (case-insensitive)
  const resultados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex flex-col items-center my-6 w-full">
        <p>Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center my-6 w-full">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center my-6 w-full">
      <h2 className="text-3xl font-bold">
        Resultados de búsqueda: "{searchQuery}"
      </h2>
      <p className="text-gray-600 mt-2">
        Se encontraron {resultados.length} producto(s)
      </p>

      <div className="flex flex-wrap justify-center mt-5 w-full">
        {resultados.length > 0 ? (
          resultados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">
            No se encontraron productos con "{searchQuery}"
          </p>
        )}
      </div>

      {/* Botón para volver */}
      <Link 
        to="/"
        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

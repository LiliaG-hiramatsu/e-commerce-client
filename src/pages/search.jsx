import { useSearch } from "../contexts/searchContext";
import data from "../data.json";
import ProductCard from "../components/products/productCard.jsx";

export default function SearchPage() {
  const { searchQuery } = useSearch();

  // Filtrar productos por búsqueda (case-insensitive)
  const resultados = data.productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    </main>
  );
}

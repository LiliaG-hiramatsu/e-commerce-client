import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function CategoryPage() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`);
        if (!res.ok) throw new Error("Categoría no encontrada");

        const data = await res.json();
        setProductos(data); // el backend devuelve SOLO productos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [id]);

  if (loading) return <p>Cargando categoría...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos en esta categoría.</p>
      ) : (
        <div>
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

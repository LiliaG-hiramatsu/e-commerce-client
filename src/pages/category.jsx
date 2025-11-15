import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/productCard";

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
    <div style={{ padding: "20px" }}>
      <h1>Categoría {id}</h1>

      <h2>Productos:</h2>

      {productos.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

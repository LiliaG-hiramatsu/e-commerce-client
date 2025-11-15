import { useEffect, useState } from "react";
import ProductCard from "../components/products/productCard.jsx";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await res.json();
        setProductos(data); // backend devuelve array de productos
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

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
      <h2 className="text-3xl font-bold">Tienda Online</h2>

      <div className="flex flex-wrap justify-center mt-5 w-full">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

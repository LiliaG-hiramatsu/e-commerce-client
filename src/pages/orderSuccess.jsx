import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`);
        if (!res.ok) throw new Error("Orden no encontrada");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center">
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Gracias por tu compra!
        </h1>

        {/* Mensaje */}
        <p className="text-gray-700 text-lg mb-2">
          Tu orden fue generada con éxito.
        </p>
        {/* Número de orden */}
        <p className="text-gray-900 font-semibold text-xl mb-6">
          Número de orden: <span className="text-green-600">{id}</span>
        </p>

        <h2 className="mt-4 font-semibold">Resumen</h2>
        <p>Fecha: {new Date(order.date || order.fecha).toLocaleString()}</p>
        <p>Total: ${order.total}</p>

        <h3 className="mt-4 font-semibold">Items</h3>
        <ul>
          {order.items.map((it, i) => (
            <li key={i}>
              Producto ID: {it.producto_id ?? it.id} — Cantidad: {it.cantidad}
            </li>
          ))}
        </ul>

        {/* Botón para volver */}
        <Link 
          to="/"
          className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
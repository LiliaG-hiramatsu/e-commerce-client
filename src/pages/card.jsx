import { useCard } from "../contexts/cardContext";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import { useNavigate } from "react-router-dom";

export default function CardPage() {
  const { card, removeFromCard, clearCard } = useCard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  
  const total = card.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  // Abrir modal
  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  // Vaciar carrito
  const handleClearCard = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCard();
    }
  };

  // Confirmar orden (recibe datos desde OrderModal)
  const handleConfirmOrder = async (orderInfo) => {
    const order = {
      usuario_id: 1, // temporal
      items: card.map((p) => ({
        producto_id: p.id,
        cantidad: p.cantidad,
      })),
      total,
      ...orderInfo, // dirección, pago, etc. desde el modal
    };

    try {
      // Llamada al backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar orden");
      }

      const result = await response.json();
      //alert("Orden enviada con éxito:\n" + JSON.stringify(result, null, 2));
      navigate(`/order-success/${result.orderId}`);

      clearCard();
      setIsModalOpen(false);
    } catch (error) {
      alert("Hubo un problema al enviar la orden");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Tu carrito</h2>

      {card.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="w-full max-w-md">
            {card.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{p.nombre} (x{p.cantidad})</span>
                <span>${p.precio * p.cantidad}</span>

                <button
                  onClick={() => removeFromCard(p.id)}
                  className="ml-2 text-red-500"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-bold text-lg">Total: ${total}</p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handlePurchase}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              💳 Comprar ahora
            </button>

            <button
              onClick={handleClearCard}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <OrderModal
          items={card}
          total={total}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
    </main>
  );
}

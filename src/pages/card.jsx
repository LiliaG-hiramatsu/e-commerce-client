import { useCard } from "../contexts/cardContext";
import { useState } from "react";
import OrderModal from "../components/OrderModal";

export default function CardPage() {
  const { card, removeFromCard, clearCard } = useCard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = card.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  // Abrir modal de compra
  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  // Manejar vaciar carrito
  const handleClearCard = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      alert("Vaciando carrito...");
      clearCard();
    }
  };

  const handleConfirmOrder = (order) => {
    // Por ahora mostramos una alerta con los datos de la orden
    alert("Orden enviada:\n" + JSON.stringify(order, null, 2));

    // Aquí se puede integrar la llamada al backend (fetch / axios)
    // ejemplo comentado:
    // await fetch(`${import.meta.env.VITE_API_URL}/orders`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(order) })

    // Limpiar carrito y cerrar modal
    clearCard();
    setIsModalOpen(false);
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

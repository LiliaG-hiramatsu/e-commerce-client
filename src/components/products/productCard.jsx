import { useCard } from "../../contexts/cardContext";
import { useState } from "react";

export default function ProductCard({ producto }) {
  const { addToCard } = useCard(); 
  const [isOpen, setIsOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const openModal = () => {
    setCantidad(1);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const confirmAdd = () => {
    const qty = Math.max(1, Math.floor(Number(cantidad) || 1));
    addToCard(producto, qty);
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-1/3 flex flex-col items-center p-3 m-2 bg-white rounded-lg shadow">
        <img src={producto.imagen} alt={producto.nombre} className="w-40 h-40 object-cover" />
        <p className="font-semibold mt-2">{producto.nombre}</p>
        <p className="text-gray-700">$ {producto.precio}</p>
        <button
          onClick={openModal}
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Añadir al carrito
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Añadir "{producto.nombre}" al carrito</h3>
            <p className="text-sm text-gray-600 mb-4">Precio: ${producto.precio}</p>

            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm">Cantidad:</label>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  onClick={() => setCantidad((c) => Math.max(1, Number(c) - 1))}
                  type="button"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="w-16 text-center px-2 py-1 outline-none"
                />
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  onClick={() => setCantidad((c) => Number(c) + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                type="button"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAdd}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                type="button"
              >
                Agregar {cantidad} al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

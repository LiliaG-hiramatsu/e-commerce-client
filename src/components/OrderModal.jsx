import React, { useState } from "react";

export default function OrderModal({ items = [], total = 0, onClose, onConfirm }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("efectivo");

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      buyer: {
        fullName,
        address,
      },
      paymentMethod: payment,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    // Llama al callback del padre
    onConfirm(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl z-10"
      >
        <h3 className="text-xl font-semibold mb-2">Confirmar compra</h3>

        <div className="mb-4">
          <h4 className="font-medium">Items</h4>
          <ul className="max-h-40 overflow-auto mt-2 border rounded p-2">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between py-1">
                <span>
                  {it.nombre} x{it.cantidad}
                </span>
                <span>${it.precio * it.cantidad}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${total}</p>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3">
          <label className="flex flex-col">
            <span className="text-sm">Nombre completo</span>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 border rounded px-2 py-1"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Domicilio</span>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 border rounded px-2 py-1"
            />
          </label>

          <fieldset className="mt-2">
            <legend className="text-sm font-medium mb-1">Método de pago</legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="efectivo"
                  checked={payment === "efectivo"}
                  onChange={() => setPayment("efectivo")}
                />
                <span>Efectivo</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="tarjeta"
                  checked={payment === "tarjeta"}
                  onChange={() => setPayment("tarjeta")}
                />
                <span>Tarjeta</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="billetera"
                  checked={payment === "billetera"}
                  onChange={() => setPayment("billetera")}
                />
                <span>Billetera virtual</span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Confirmar compra
          </button>
        </div>
      </form>
    </div>
  );
}

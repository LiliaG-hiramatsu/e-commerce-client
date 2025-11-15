import { createContext, useContext, useState } from "react";

const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [card, setCard] = useState([]);

  /** 
   * Agrega un producto al carrito.
   * Guarda solo lo necesario para facilitar envío al backend.
   */
  function addToCard(product, cantidad = 1) {
    setCard((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          cantidad,
        },
      ];
    });
  }

  /** Remueve un producto del carrito */
  function removeFromCard(id) {
    setCard((prev) => prev.filter((p) => p.id !== id));
  }

  /** Limpia el carrito por completo */
  function clearCard() {
    setCard([]);
  }

  return (
    <CardContext.Provider
      value={{
        card,
        addToCard,
        removeFromCard,
        clearCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

/** Hook para acceder al contexto del carrito */
export function useCard() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}

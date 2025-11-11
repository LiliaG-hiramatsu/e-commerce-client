import { createContext, useContext, useState } from "react";

const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [card, setCard] = useState([]);

  // Ahora acepta una cantidad opcional (por defecto 1)
  function addToCard(product, cantidad = 1) {
    setCard((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      }
      return [...prev, { ...product, cantidad }];
    });
  }

  function removeFromCard(id) {
    setCard((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCard() {
    setCard([]);
  }

  return (
    <CardContext.Provider value={{ card, addToCard, removeFromCard, clearCard }}>
      {children}
    </CardContext.Provider>
  );
}

//Esta funcion sirve para usar el contexto del carrito en otros componentes
//y lanza un error si se usa fuera del proveedor
export function useCard() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}

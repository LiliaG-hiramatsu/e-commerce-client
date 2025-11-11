# 📚 Documentación Completa - E-Commerce Frontend

> **Última actualización**: Noviembre 2025
> **Versión**: 1.0

---

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Sistema de Categorías](#sistema-de-categorías)
3. [Flujo de Compra Completo](#flujo-de-compra-completo)
4. [API y Endpoints](#api-y-endpoints)
5. [Integración Backend](#integración-backend)
6. [Pruebas Locales](#pruebas-locales)

---

## 🏗️ Arquitectura General

### Estructura del Proyecto

```
├── src/
│   ├── pages/
│   │   ├── home.jsx           → Página principal con todos los productos
│   │   ├── category.jsx       → Filtrado por categoría
│   │   ├── search.jsx         → Búsqueda sensible a mayúsculas
│   │   └── card.jsx           → Carrito de compras
│   ├── components/
│   │   ├── products/
│   │   │   └── productCard.jsx     → Tarjeta de producto con modal de cantidad
│   │   ├── layout/
│   │   │   └── navbar.jsx          → Navbar con categorías y búsqueda
│   │   └── OrderModal.jsx          → Modal de confirmación de compra
│   ├── contexts/
│   │   ├── cardContext.jsx    → Context para gestionar carrito
│   │   └── searchContext.jsx  → Context para búsqueda
│   ├── routes/
│   │   └── approutes.jsx      → Rutas principales
│   └── data.json              → Datos locales (fallback)
├── DOCUMENTACION_COMPLETA.md  → Este archivo
└── package.json
```

### Stack Tecnológico

| Tecnología | Propósito |
|------------|----------|
| React 19 + Vite | Framework UI y bundler |
| React Router 7 | Navegación entre páginas |
| Tailwind CSS | Estilos utilities |
| Context API | Estado global (carrito, búsqueda) |
| Fetch API | Comunicación con backend |

---

## 🏷️ Sistema de Categorías

### Diagrama de Flujo

```
┌──────────────────────────────────────────────────────────┐
│                      NAVBAR                              │
│                                                          │
│  Logo    Categorías ▼         🔍 Buscar       🛒 Carrito │
│           │                                             │
│           ├─ 🎽 Ropa        → /category/1              │
│           ├─ 👜 Accesorios  → /category/2              │
│           ├─ 🏠 Hogar       → /category/3              │
│           └─ 📦 Todos       → /                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
         │
         ▼
    ┌──────────────────┐
    │ CategoryPage     │
    │ /category/:id    │
    └────────┬─────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Filtrar productos por          │
    │ categoria_id === parseInt(id)  │
    └────────────┬───────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ Mostrar ProductCard(s)       │
    │ de esa categoría             │
    └──────────────────────────────┘
```

### Tabla de Categorías

| ID | Nombre | Ícono | Ejemplos de Productos |
|----|--------|-------|----------------------|
| 1 | Ropa | 🎽 | Remera, Pantalón, Campera, Chaleco, Zapatillas |
| 2 | Accesorios | 👜 | Gorra, Bufanda, Cinturón, Guantes, Medias |
| 3 | Hogar | 🏠 | Taza, Maceta, Almohada, Linterna |

### Código Clave - `category.jsx`

```javascript
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data.json";
import ProductCard from "../components/products/productCart.jsx";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Convertir categoryId a número para comparación correcta
    const catId = parseInt(categoryId);
    const filtered = data.productos.filter(p => p.categoria_id === catId);
    setFilteredProducts(filtered);
  }, [categoryId]);

  return (
    <main className="flex flex-col items-center my-6">
      <h2>Categoría: {categoryId}</h2>
      <div className="flex flex-wrap">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
}
```

---

## 🛒 Flujo de Compra Completo

### Diagrama del Flujo de Compra

```
┌──────────────────────┐
│   1. HOME/CATEGORY   │
│   Ver productos      │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│ 2. PRODUCTO CARD     │
│ Click "Añadir al     │
│    carrito"          │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────────────────────┐
│ 3. MODAL DE CANTIDAD                 │
│ - Imagen del producto                │
│ - Precio                             │
│ - Botones −/+/ para cantidad         │
│ - Botones Cancelar / Agregar         │
└───────────┬──────────────────────────┘
            │ (Confirmar)
            ▼
┌──────────────────────────────────────┐
│ 4. CARD CONTEXT                      │
│ addToCard(product, cantidad)         │
│ Actualiza estado: card = [...items]  │
└───────────┬──────────────────────────┘
            │
            ▼
┌──────────────────────┐
│ 5. NAVBAR           │
│ Ícono 🛒 actualiza  │
│ con cantidad de items│
└───────────┬─────────┘
            │ Click en 🛒
            ▼
┌──────────────────────────────────────┐
│ 6. PÁGINA CARD                       │
│ - Listado de items                   │
│ - Total ($)                          │
│ - Botones: Comprar/Vaciar            │
└───────────┬──────────────────────────┘
            │ Click "Comprar ahora"
            ▼
┌──────────────────────────────────────────────────────┐
│ 7. ORDER MODAL                                       │
│ ┌───────────────────────────────────────────────────┐│
│ │ Items en carrito:                                 ││
│ │ - Remera x2: $51                                  ││
│ │ - Alfombra x1: $45                                ││
│ │ Total: $96                                        ││
│ ├───────────────────────────────────────────────────┤│
│ │ Nombre completo: [_______________]                ││
│ │ Domicilio:       [_______________]                ││
│ │                                                   ││
│ │ Método de pago:                                   ││
│ │ ○ Efectivo  ○ Tarjeta  ○ Billetera virtual       ││
│ │                                                   ││
│ │ [Cancelar]  [Confirmar compra]                    ││
│ └───────────────────────────────────────────────────┘│
└───────────┬──────────────────────────────────────────┘
            │ (Confirmar)
            ▼
┌──────────────────────────────────────┐
│ 8. ENVÍO A BACKEND                   │
│ POST /api/orders                     │
│ Con payload: order (ver abajo)       │
└───────────┬──────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│ 9. RESPUESTA                         │
│ ✅ Orden creada exitosamente         │
│ Limpiar carrito                      │
│ Cerrar modal                         │
└──────────────────────────────────────┘
```

### Estados y Transiciones en el Modal

```javascript
// ProductCard.jsx - Modal de cantidad
const [isOpen, setIsOpen] = useState(false);        // Modal abierto/cerrado
const [cantidad, setCantidad] = useState(1);        // Cantidad seleccionada

const confirmAdd = () => {
  const qty = Math.max(1, Math.floor(Number(cantidad) || 1));
  addToCard(producto, qty);  // ← Llama al contexto
  setIsOpen(false);
};
```

---

## 🔌 API y Endpoints

### Esquema del JSON que se envía

```javascript
// Estructura completa de la orden
const order = {
  buyer: {
    fullName: "María Pérez García",
    address: "Calle Falsa 123, Apto 4B, Buenos Aires"
  },
  paymentMethod: "tarjeta",  // "efectivo" | "tarjeta" | "billetera"
  items: [
    {
      id: 1,
      nombre: "Remera Roja",
      precio: 25.5,
      cantidad: 2
    },
    {
      id: 3,
      nombre: "Alfombra Hogar",
      precio: 45.0,
      cantidad: 1
    }
  ],
  total: 96.0,
  createdAt: "2025-11-10T12:34:56.789Z"
};
```

### Tabla de Endpoints Recomendados

| Método | Endpoint | Descripción | Request | Response |
|--------|----------|-------------|---------|----------|
| GET   | `/api/products` | Obtener todos los productos | — | `[{id, nombre, precio, ...}]` |
| GET   | `/api/products/:id` | Obtener un producto | — | `{id, nombre, precio, ...}` |
| POST | `/api/orders` | Crear una orden | `order` | `{orderId, status, message}` |
| GET | `/api/orders/:id` | Obtener detalles de orden | — | `{orderId, items, total, ...}` |

### Ejemplo de Respuesta del Backend

```json
{
  "orderId": "ord_64a3f2b2",
  "status": "created",
  "message": "Orden creada correctamente",
  "data": {
    "id": "ord_64a3f2b2",
    "buyer": {
      "fullName": "María Pérez García",
      "address": "Calle Falsa 123, Apto 4B"
    },
    "paymentMethod": "tarjeta",
    "total": 96.0,
    "createdAt": "2025-11-10T12:34:56.789Z"
  }
}
```

---

## 🔗 Integración Backend

### Paso 1: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:4000
```

### Paso 2: Snippet de Fetch para POST /api/orders

```javascript
// En src/pages/card.jsx - función handleConfirmOrder()

const handleConfirmOrder = async (order) => {
  try {
    // 🔌 ENVIAR AL BACKEND
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error:", errorData);
      alert("❌ No se pudo procesar la orden: " + response.statusText);
      return;
    }

    const data = await response.json();
    // ✅ Éxito
    alert(`✅ Compra confirmada.\nNúmero de orden: ${data.orderId}`);
    
    // Limpiar carrito solo después de éxito
    clearCard();
    setIsModalOpen(false);

  } catch (error) {
    console.error("Error de red:", error);
    alert("❌ Error de conexión con el servidor");
  }
};
```

### Paso 3: Servicio Centralizado (Opcional)

Crea `src/services/orderService.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (order) => {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};
```

---

## 🧪 Pruebas Locales

### Requisitos Previos

- Node.js 16+
- Backend corriendo en `http://localhost:4000` (o la URL en `.env`)
- Base de datos con tabla `orders` y `products`

### Comando para Ejecutar Frontend

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

### Flujo de Prueba Manual

```
1. HOME
   ├─ Ver lista de productos ✓
   └─ Click en "Añadir al carrito" ✓

2. MODAL DE CANTIDAD
   ├─ Cambiar cantidad (−/+) ✓
   └─ Confirmar agregar ✓

3. NAVBAR
   ├─ Ícono 🛒 muestra cantidad ✓
   └─ Click en 🛒 abre /card ✓

4. PÁGINA CARD
   ├─ Listar items del carrito ✓
   ├─ Mostrar total correcto ✓
   ├─ Botón "❌" elimina item ✓
   └─ Click "Comprar ahora" abre modal ✓

5. ORDER MODAL
   ├─ Mostrar items ✓
   ├─ Ingresar nombre y domicilio ✓
   ├─ Seleccionar método de pago ✓
   └─ Confirmar envía POST ✓

6. RESPUESTA
   ├─ Alerta con orderId ✓
   ├─ Carrito se vacía ✓
   └─ Modal se cierra ✓

7. VERIFICACIÓN EN BACKEND
   └─ POST /api/orders recibió el JSON ✓
```

### Ejemplo de Backend Express (Node.js)

Crea `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Almacenamiento en memoria (para pruebas)
let orders = [];

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const order = req.body;
  
  // Validaciones básicas
  if (!order.buyer.fullName || !order.buyer.address) {
    return res.status(400).json({ error: "Faltan datos del comprador" });
  }

  // Generar ID único
  const orderId = `ord_${Date.now()}`;
  
  const savedOrder = {
    ...order,
    orderId,
    status: "created",
    createdAt: new Date()
  };

  orders.push(savedOrder);
  
  console.log("✅ Orden recibida:", savedOrder);
  
  res.status(201).json({
    orderId,
    status: "created",
    message: "Orden creada correctamente"
  });
});

// GET /api/orders (listar todas)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(4000, () => {
  console.log('✅ Backend en http://localhost:4000');
});
```

Ejecutar backend:

```bash
cd backend
npm init -y
npm install express cors body-parser
node server.js
```

---

## 📊 Resumen Comparativo

### Rutas Disponibles

| Ruta | Componente | Datos |
|------|-----------|-------|
| `/` | `home.jsx` | Todos los productos |
| `/category/:categoryId` | `category.jsx` | Productos filtrados por categoría |
| `/search` | `search.jsx` | Resultados de búsqueda (caso-sensible) |
| `/card` | `card.jsx` | Items del carrito + formulario compra |

### Estados Globales (Context)

| Context | Responsable | Estado | Funciones |
|---------|------------|--------|-----------|
| `CardContext` | `cardContext.jsx` | `card: []` | `addToCard()`, `removeFromCard()`, `clearCard()` |
| `SearchContext` | `searchContext.jsx` | `searchTerm: ""` | `setSearchTerm()` |

### Componentes Principales

| Componente | Ubicación | Props | Output |
|-----------|-----------|-------|--------|
| `ProductCard` | `/components/products/` | `producto` | Abre modal de cantidad |
| `OrderModal` | `/components/` | `items`, `total`, `onConfirm` | Envía orden |
| `Navbar` | `/components/layout/` | — | Categorías, búsqueda, carrito |

---
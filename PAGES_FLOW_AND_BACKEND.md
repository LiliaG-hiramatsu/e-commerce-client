## Flujo de páginas y envío de JSON al backend

---

## Páginas principales (resumen)

- Home (`/`): lista de productos; cada producto se muestra con `ProductCard`.
- Category (`/category/:categoryId`): lista filtrada por categoría.
- Search (`/search`): resultados de búsqueda (sensible a mayúsculas/minúsculas).
- Card (`/card`): página del carrito (antes llamada `cart`). Muestra items, total, botones "Comprar ahora" y "Vaciar carrito".

Acción clave: en `ProductCard` el botón "Añadir al carrito" abre un modal donde el usuario elige la cantidad y confirma. Esa acción llama a `addToCard(product, cantidad)` en `CardContext`.

---

## Flujo de compra (user story)

1. Usuario navega en Home o Category y pulsa "Añadir al carrito".
2. Se abre un modal en la UI con control de cantidad (1, 2, 3...).
3. Al confirmar, la app actualiza el `CardContext` con `addToCard(product, cantidad)`.
4. El usuario va a la página `Card` y pulsa "Comprar ahora".
5. Se abre un `OrderModal` que muestra:
   - Lista de items del carrito (nombre, cantidad, subtotal).
   - Total.
   - Campos para: Nombre completo, Domicilio.
   - Selector de método de pago: efectivo / tarjeta / billetera virtual.
6. El usuario rellena los datos y confirma la compra.
7. La app arma el objeto `order` (ver esquema abajo) y lo envía al backend (POST).
8. En caso de éxito se limpia el carrito (`clearCard()`); si no, mostrar error y mantener carrito.

---

## Esquema del JSON que se envía al backend (orden)

Ejemplo de objeto `order` que se construye en `OrderModal` y se envía con fetch/axios:

```json
{
  "buyer": {
    "fullName": "María Pérez",
    "address": "Calle Falsa 123, Ciudad"
  },
  "paymentMethod": "tarjeta",
  "items": [
    { "id": 1, "nombre": "Remera Roja", "precio": 25.5, "cantidad": 2 },
    { "id": 3, "nombre": "Alfombra Hogar", "precio": 45.0, "cantidad": 1 }
  ],
  "total": 96.0,
  "createdAt": "2025-11-10T12:34:56.789Z"
}
```

Notas:
- `items` deben contener al menos `id`, `nombre`, `precio` y `cantidad` para que el backend pueda calcular/validar totales.
- `total` puede ser calculado en frontend y validado en backend (recomendado validar en backend).

---

## Endpoints recomendados (backend)

- GET /api/products
  - Devuelve la lista de productos (JSON array).
- GET /api/products/:id
  - Devuelve datos de un producto.
- POST /api/orders
  - Recibe el objeto `order` mostrado arriba.
  - Responde 201 con `{ orderId, status }` o 4xx/5xx en caso de error.

---

## Snippet de ejemplo (fetch) para enviar la orden

Este snippet es compatible con Vite (usar la variable de entorno `VITE_API_URL`).

```js
const order = { /* objeto mostrado arriba */ };

try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    // Manejar error: mostrar mensaje y no limpiar carrito
    const err = await res.text();
    console.error("Error al crear orden:", err);
    alert("No se pudo procesar la orden: " + res.statusText);
    return;
  }

  const data = await res.json();
  // data puede contener orderId, status, etc.
  alert("Compra confirmada. Orden ID: " + data.orderId);
} catch (e) {
  console.error(e);
  alert("Error de red al enviar la orden");
}
```

Recomendación: solo limpiar el carrito (`clearCard()`) después de recibir confirmación 2xx del servidor.

---

## Ejemplo de respuesta esperada del backend

```json
{
  "orderId": "ord_64a3f2b2",
  "status": "created",
  "message": "Orden creada correctamente"
}
```

---

## Cómo probar localmente

1. Asegúrate de tener la URL del backend en `.env` (archivo Vite):

```
VITE_API_URL=http://localhost:4000
```

2. Ejecuta el front:

```bash
npm install
npm run dev
```

3. Flujo de prueba:
   - Añadir productos desde Home.
   - Abrir `Card` y pulsar "Comprar ahora".
   - Rellenar formulario del modal y confirmar.
   - Verificar en la consola del backend que recibió el POST en `/api/orders` con el JSON.

---


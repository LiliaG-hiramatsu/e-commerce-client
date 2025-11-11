# 🏷️ Sistema de Filtrado por Categoría

## ✅ ¿Cómo funciona?

### 1. **Menú Desplegable en NavBar**
- Cuando pasas el mouse sobre "Categorías ▼", aparece un dropdown
- Muestra 3 opciones: Ropa, Accesorios, Hogar
- Cada opción es un link a `/category/{id}`

### 2. **Flujo de Datos**

```
Usuario clickea "Ropa" en dropdown
           ↓
Link a /category/1
           ↓
CategoryPage obtiene categoryId = "1"
           ↓
Filtra productos donde categoria_id === 1
           ↓
Muestra solo productos de Ropa
```

### 3. **Archivos Modificados**

#### ✅ `src/routes/approuter.jsx`
- Agregada ruta: `<Route path="/category/:categoryId" element={<CategoryPage />} />`

#### ✅ `src/pages/category.jsx`
- Correcciones:
  - `categoryId` convertido a número: `parseInt(categoryId)`
  - Campo correcto en filter: `categoria_id` (no `categoriaId`)
  - Importación correcta: `productCart.jsx` (no `ProductCard`)
  - Manejo de error si no hay productos

#### ✅ `src/components/layout/navbar.jsx`
- Ya estaba bien configurado
- Links a `/category/{categoria.id}`

---

## 📊 Categorías Disponibles

| ID | Nombre | Productos |
|----|--------|-----------|
| 1 | 🎽 Ropa | Remeras, Pantalones, Camperas, Chalecos, Zapatillas |
| 2 | 👜 Accesorios | Gorras, Bufandas, Cinturones, Guantes, Medias, Corbatas |
| 3 | 🏠 Hogar | Tazas, Macetas |

---

## 🔄 Flujo Completo

```
NAVBAR
├─ Logo "Mi Tienda" → /
├─ Menú Desplegable "Categorías ▼"
│  ├─ Ropa → /category/1
│  ├─ Accesorios → /category/2
│  └─ Hogar → /category/3
└─ Carrito → /card
```

---

## 🎯 Ejemplo en Tiempo Real

### Si clickeas "Ropa":
1. URL cambia a: `http://localhost:5173/category/1`
2. `CategoryPage` recibe `categoryId = "1"`
3. Filtra: `productos.filter(p => p.categoria_id === 1)`
4. Muestra: Remera, Pantalón, Campera, Chaleco, Zapatillas (todos con `categoria_id: 1`)

### Si clickeas "Accesorios":
1. URL cambia a: `http://localhost:5173/category/2`
2. Filtra: `productos.filter(p => p.categoria_id === 2)`
3. Muestra: Gorra, Bufanda, Cinturón, Guantes, Medias, Corbata

---

## 🧪 Prueba

```cmd
npm run dev
```

1. Abre `http://localhost:5173`
2. Pasa el mouse sobre "Categorías ▼"
3. Haz click en cualquier categoría
4. Deberías ver solo productos de esa categoría

---

## 📝 Estructura en `data.json`

```json
{
  "categorias": [
    { "id": 1, "nombre": "Ropa" },
    { "id": 2, "nombre": "Accesorios" },
    { "id": 3, "nombre": "Hogar" }
  ],
  "productos": [
    {
      "id": 101,
      "nombre": "Remera de algodón",
      "categoria_id": 1,  // ← Vinculado con categoría 1
      "precio": 7999,
      ...
    }
  ]
}
```

---

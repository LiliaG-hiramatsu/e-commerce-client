import { useParams } from "react-router-dom";
import data from "../data.json";
import ProductCard from "../components/products/productCard.jsx";

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  // Convertir categoryId a número para comparar correctamente
  const categoryIdNum = parseInt(categoryId);
  
  // Encontrar la categoría por ID
  const categoria = data.categorias.find((c) => c.id === categoryIdNum);
  
  // Filtrar productos por categoría
  const productos = data.productos.filter(
    (p) => p.categoria_id === categoryIdNum
  );

  return (
    <main className="flex flex-col items-center my-6 w-full">
      <h2 className="text-2xl font-bold">{categoria?.nombre || "Categoría no encontrada"}</h2>
      <div className="flex flex-wrap justify-center mt-5 w-full">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="text-gray-500">No hay productos en esta categoría</p>
        )}
      </div>
    </main>
  );
}

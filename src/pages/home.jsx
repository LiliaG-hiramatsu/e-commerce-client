import data from "../data.json";
import ProductCard from "../components/products/productCard.jsx";

export default function Home() {
  const productos = data.productos;

  return (
    <main className="flex flex-col items-center my-6 w-full">
      <h2 className="text-3xl font-bold">{data.tienda.nombre}</h2>
      <div className="flex flex-wrap justify-center mt-5 w-full">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

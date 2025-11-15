import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-green-600">¡Orden realizada con éxito! 🎉</h1>
      <p className="mt-3 text-lg">Tu número de orden es:</p>

      <div className="mt-2 px-6 py-3 bg-gray-200 rounded-lg font-mono text-xl">
        {id}
      </div>

      <a
        href="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </a>
    </div>
  );
}

import Navbar from "../components/layout/navbar.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar />

      <div className="flex-grow">{children}</div>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-6">
        © {new Date().getFullYear()} Programación Web ITU 2025. Todos los derechos reservados.
      </footer>
    </div>
  );
}


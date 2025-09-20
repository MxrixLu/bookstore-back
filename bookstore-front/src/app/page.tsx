import Link from "next/link";

export default function Home() {
  return (
    <main className = "container mx-auto p-8">
      <h1 className = "text-3xl font-bold mb-4">Bienvenido a la tienda de libros</h1>
      <p className = "text-gray-600 mb-6">Explora nuestros autores</p>
      <Link href="/authors" className = "text-pink-500 hover:text-pink-700">Ir a autores</Link>
    </main>
  );
}

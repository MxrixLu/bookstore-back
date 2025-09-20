import { getAuthors } from "@/lib/api/authors";
import List from "@/components/authors/List";

export default async function AuthorsPage(){
    const authors = await getAuthors();
    return(
        <main className = "container mx-auto p-8">
            <h1 className = "text-3xl font-bold mb-4 text-blue-600"> Portal Autores </h1>
            <p className = "text-gray-600 mb-6 text-black-600">Gestiona los autores de la tienda de libros</p>
            <List authors={authors} />
        </main>
    )
}
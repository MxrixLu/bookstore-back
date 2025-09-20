import React from "react"; 
import Header from "@/components/Header"; 

export default function AuthorLayout(
    {children} : {children: React.ReactNode}
) {
    const routes = [
        {name: "Lista de Autores", path: "/authors"}, 
        {name: "Crear autor", path: "/authors/create"}, 
        {name: "Favoritos", path: "/authors/favorites"},
    ]; 

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header routes={routes} />
            <main className="flex-grow">
                {children}{" "}
            </main>
        </div>
    )
}
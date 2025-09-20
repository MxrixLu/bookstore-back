"use client"; 

import {useState, useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Author ={
    id: number; 
    birthDate: Date;
    name: string;
    description: string;
    image: string;
}

export default function AuthorCard({author, onHide, onFavoriteChange}: {author: Author, onHide: (id: number) => void, onFavoriteChange?: (author: Author, isFavorite: boolean) => void}){
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();

    // Initialize favorite state from localStorage
    useEffect(() => {
        const favorites = localStorage.getItem("favorites");
        if(favorites){
            const favoritesArray = JSON.parse(favorites);
            setIsFavorite(favoritesArray.some((fav: Author) => fav.id === author.id));
        }
    }, [author.id]);

    const toogleFavorite = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        
        const favorites = localStorage.getItem("favorites");
        let favoritesArray: Author[] = favorites ? JSON.parse(favorites) : [];
        
        if(newFavoriteState){
            // Add to favorites (store full author object)
            if(!favoritesArray.some(fav => fav.id === author.id)){
                favoritesArray.push(author);
            }
        } else {
            // Remove from favorites
            favoritesArray = favoritesArray.filter(fav => fav.id !== author.id);
        }
        
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        
        // Notify parent component about the change
        if(onFavoriteChange){
            onFavoriteChange(author, newFavoriteState);
        }
    }
    const handleEdit = () => {
        router.push(`/authors/edit/${author.id}`);
    }
    const handleDelete = () => {
        onHide(author.id);
        router.refresh();
        router.push(`/authors/`);
    }

    return (
        <li className="flex items-start justify-between rounded-xl border p-4 shadow-sm"> 
        <div>
            <h3 className="text-lg font-semibold text-pink-600">{author.name}</h3><br />
            <p className="text-sm text-gray-500 text-black">{author.description}</p><br />
            <p className="text-sm text-gray-500 text-black"><b>Birth Date:</b> {new Date(author.birthDate).toLocaleDateString()}</p>
            <button 
                onClick={toogleFavorite}
                className={"text-black border-2 border-pink-600 rounded-md px-2 py-1 bg-pink-600"}
                aria-label={
                    isFavorite ? `Quitar ${author.name} de favoritos` : `Agregar ${author.name} a favoritos`
                }
                >
                    {isFavorite ? "★" : "☆"}
                </button>
                <button 
                onClick={handleEdit}
                aria-label={
                    'Editar ${author.name}'
                }
                className={"text-black border-2 border-pink-600 rounded-md px-2 py-1 ml-2 bg-pink-600"}
                >
                    {"✏️" }
                </button>

                <button 
                onClick={handleDelete}
                aria-label={
                    'Eliminar ${author.name}'
                }
                className={"text-black border-2 border-pink-600 rounded-md px-2 py-1 ml-2 bg-pink-600"}
                >
                    {"🗑️"}
                </button>
        </div>
        {author.image ? (
        <Image
            src={author.image}
            alt={author.name}
            width={100}
            height={100}
        />
        ) : (
        <div className="w-[100px] h-[100px] bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-500 text-sm">Sin foto</span>
        </div>
        )}
        </li>
    )
}
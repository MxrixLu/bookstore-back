"use client"; 

import {useState, useEffect} from "react";
import Image from "next/image";

type Author ={
    id: number; 
    birthDate: Date;
    name: string;
    description: string;
    image: string;
}

export default function AuthorCard({author}: {author: Author}){
    const [isFavorite, setIsFavorite] = useState(false);

    const toogleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <li className="flex items-start justify-between rounded-xl border p-4 shadow-sm"> 
        <div>
            <h3 className="text-lg font-semibold text-blue-600">{author.name}</h3><br />
            <p className="text-sm text-gray-500 text-black">{author.description}</p><br />
            <p className="text-sm text-gray-500 text-black"><b>Birth Date:</b> {new Date(author.birthDate).toLocaleDateString()}</p>
            <button 
                onClick={toogleFavorite}
                className={`ml-4 text-2xl transition-colors ${isFavorite ? "text-yellow-400" : "text-gray-400"}`}
                aria-label={
                    isFavorite ? `Quitar ${author.name} de favoritos` : `Agregar ${author.name} a favoritos`
                }
                >
                    {isFavorite ? "★" : "☆"}
                </button>
        </div>
        <Image src={author.image} alt={author.name} width={100} height={100} />

        </li>
    )
}
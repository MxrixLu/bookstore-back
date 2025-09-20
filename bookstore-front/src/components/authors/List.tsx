"use client";
import { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";

type Author ={
    id: number; 
    birthDate: Date;
    name: string;
    description: string;
    image: string;
}

export default function List({authors: initialAuthors}: {authors: Author[]}){
    const[hiddenAuthors, setHiddenAuthors] = useState<number[]>([]);

    useEffect(() =>{
        const stored = localStorage.getItem("hiddenAuthors");
        if(stored){
            setHiddenAuthors(JSON.parse(stored));
        }
    }, []);
    
    useEffect(() => {
        setHiddenAuthors(prev => {
            const idsActuales = initialAuthors.map(a => a.id);
            const filtrados = prev.filter(id => idsActuales.includes(id));
            if (filtrados.length !== prev.length){
                localStorage.setItem("hiddenAuthors", JSON.stringify(filtrados));
            }
            return filtrados;
            });
    }, [initialAuthors]);
    
    const hideAuthor = (id: number) => {
        const updated = [...hiddenAuthors, id]
        setHiddenAuthors(updated);
        localStorage.setItem("hiddenAuthors", JSON.stringify(updated));
      };
    const visibleAuthors = initialAuthors.filter(a=> !hiddenAuthors.includes(a.id));
    return (
        <ul className="space-y-4">
            {visibleAuthors.map((a)=> (
                <AuthorCard key={a.id} author={a} onHide={hideAuthor} />
            ))}
        </ul>
    )

}
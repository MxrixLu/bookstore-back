"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthor } from "@/lib/api/authors";

type FormValues ={
    id?: number;        
    name: string;
    description: string;
    birthDate: string;     
    image: string;
}
export default function CreateAuthorPage(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: { [key:string]: string } = {};

        if (!name.trim()) newErrors.name = "El nombre es requerido";
        if (!description.trim()) newErrors.description = "La descripción es requerida";
        if (!birthDate.trim()) newErrors.birthDate = "La fecha de nacimiento es requerida";
        if (!image.trim()) newErrors.image = "La imagen es requerida";

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try{
            await createAuthor({id: 0, name, description, birthDate: new Date(birthDate), image});
            router.refresh();
            router.push(`/authors/`);
        }catch(error){
            console.error("Error al crear el autor", error);
            alert("Error al crear el autor");
        }finally{
            setIsSubmitting(false);
        }
        }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-pink-600">Crear nuevo autor</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    className ="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-black p-2"/>
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Descripcion</label>
                    <input 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className ="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-black p-2"/>
                    {errors.description && (
                        <p className="text-red-500">{errors.description}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                    <input 
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className ="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-black p-2"/>
                    {errors.birthDate && (
                        <p className="text-red-500">{errors.birthDate}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Imagen del autor</label>
                    <input 
                    type = "url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className ="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-black p-2"/>
                    {errors.image && (
                        <p className="text-red-500">{errors.image}</p>
                    )}
                </div>
                < button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Creando..." : "Crear autor"}
                </button>
                </form>
            </section>
            </div>
    )

    
}

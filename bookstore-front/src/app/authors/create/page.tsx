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
            await createAuthor({name, description, birthDate, image});
            router.push(`/authors/`);
        }catch(error){
            console.error("Error al crear el autor", error);
            alert("Error al crear el autor");
        }finally{
            setIsSubmitting(false);
        }
        }
    return (
        <section className="mx-auto max-w-md rounded-xl bg-white p-6shadow-sm">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Crear nuevo autor</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Descripcion</label>
                    <input 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && (
                        <p className="text-red-500">{errors.description}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                    <input 
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)} />
                    {errors.birthDate && (
                        <p className="text-red-500">{errors.birthDate}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Imagen del autor</label>
                    <input 
                    type = "url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
                    {errors.image && (
                        <p className="text-red-500">{errors.image}</p>
                    )}
                </div>
                < button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Creando..." : "Crear autor"}
                </button>
                </form>
            </section>
    )

    
}

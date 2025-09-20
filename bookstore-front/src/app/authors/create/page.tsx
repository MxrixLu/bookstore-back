"use client";
import React from "react";
import { useForm } from "react-hook-form";
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
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormValues>();
    const router = useRouter();
    const onSubmit = async (data: FormValues) => {
        try{
            const newAuthor = await createAuthor(data);
            router.push(`/authors/`);
        }catch(error){
            console.error("Error al crear el autor", error);
            alert("Error al crear el autor");
        }
    }; 
    return (
        <section className="mx-auto max-w-md rounded-xl bg-white p-6shadow-sm">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Crear nuevo autor</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                    {...register("name", {required: "El nombre es requerido"})}
                    className="w-full rounded border p-2" />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Descripcion</label>
                    <input 
                    {...register("description", {required: "La descripción del autor es requerida"})}
                    className="w-full rounded border p-2" />
                    {errors.description && (
                        <p className="text-red-500">{errors.description.message}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                    <input 
                    type="date"
                    {...register("birthDate", {required: "La fecha de nacimiento es requerida"})}
                    className="w-full rounded border p-2" />
                    {errors.birthDate && (
                        <p className="text-red-500">{errors.birthDate.message}</p>
                    )}
                </div>
                <div> 
                    <label className= "block text-sm font-medium text-gray-700">Imagen del autor</label>
                    <input 
                    type = "url"
                    {...register("image", {required: "La imagen del autor es requerida"})}
                    className="w-full rounded border p-2" />
                    {errors.image && (
                        <p className="text-red-500">{errors.image.message}</p>
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

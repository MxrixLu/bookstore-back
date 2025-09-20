"use client";
import { getAuthor, updateAuthor } from "@/lib/api/authors";
import { Author } from "@/types/author";
import { use, useEffect, useState } from "react";


export default function EditAuthorPage({params}: {params: Promise<{id: string}>}) {
    const {id} = use(params);
    const [author, setAuthor] = useState<Author | null>(null);

    const [name, setName] = useState(author?.name);
    const [description, setDescription] = useState(author?.description);
    const [birthDate, setBirthDate] = useState(author?.birthDate);
    const [image, setImage] = useState(author?.image);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getAuthor(id).then((data) => {
          setAuthor(data);
          setName(data.name);
          setDescription(data.description);
          setBirthDate(data.birthDate);
          setImage(data.image);
        });
      }, [id]);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!name?.trim() || !description?.trim() || !birthDate?.trim() || !image?.trim()) {
      newErrors.all = "Todos los campos son obligatorios";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try{
        await updateAuthor(id, {name: name!, description: description!, birthDate: birthDate!, image: image!});
    }catch(error){
        console.error("Error al actualizar el autor", error);
    }finally{
        setIsSubmitting(false);
    }
};
if (!author) return <p>Cargando autor…</p>;

return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Editar autor
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen (URL)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black p-2"
            />
          </div>

          {errors.all && (
            <p className="text-red-500 text-sm mb-4">{errors.all}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>
      </section>
    </div>
  );
}
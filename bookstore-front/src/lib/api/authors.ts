import { Author } from "@/types/author";

export async function getAuthors(){
    const res = await fetch("http://127.0.0.1:8080/api/authors", {
        next: {revalidate:60},
    });
    const authors = await res.json();
    return authors;
}
export async function createAuthor(author: Author){
    const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
    });
    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
    const newAuthor = await res.json();
    return newAuthor;
}

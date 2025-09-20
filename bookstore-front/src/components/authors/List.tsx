import AuthorCard from "./AuthorCard";

type Author ={
    id: number; 
    birthDate: Date;
    name: string;
    description: string;
    image: string;
}

export default function List({authors}: {authors: Author[]}){
    return (
        <ul className="space-y-4">
            {authors.map((a)=> (
                <AuthorCard key={a.id} author={a} />
            ))}
        </ul>
    )

}
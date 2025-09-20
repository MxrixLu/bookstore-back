"use client";
import { useEffect, useState } from "react";
import AuthorCard from "@/components/authors/AuthorCard";
import { Author } from "@/types/author";

export default function FavoritesPage(){
    const [favorites, setFavorites] = useState<Author[]>([]);

    // Load favorites from localStorage
    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem("favorites");
        if(storedFavorites){
            try {
                const parsedFavorites = JSON.parse(storedFavorites);
                // Filter out any null, undefined, or invalid entries
                const validFavorites = parsedFavorites.filter((author: Author) => 
                    author && 
                    typeof author === 'object' && 
                    author.id !== null && 
                    author.id !== undefined &&
                    typeof author.id === 'number' &&
                    typeof author.name === 'string' &&
                    typeof author.description === 'string' &&
                    typeof author.birthDate === 'string' &&
                    typeof author.image === 'string' &&
                    author.name !== '' &&
                    author.description !== '' &&
                    author.birthDate !== '' &&
                    author.image !== ''
                );
                setFavorites(validFavorites);
                
                // Update localStorage with cleaned data if needed
                if (validFavorites.length !== parsedFavorites.length) {
                    localStorage.setItem("favorites", JSON.stringify(validFavorites));
                }
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error);
                setFavorites([]);
                localStorage.removeItem("favorites");
            }
        } else {
            setFavorites([]);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    // Handle when an author's favorite status changes
    const handleFavoriteChange = (author: Author, isFavorite: boolean) => {
        if(!isFavorite) {
            // Remove from local state immediately for instant UI update
            setFavorites(prev => prev.filter(fav => fav.id !== author.id));
        } else {
            // Add to local state if not already present
            setFavorites(prev => {
                if(!prev.some(fav => fav.id === author.id)) {
                    return [...prev, author];
                }
                return prev;
            });
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4 text-pink-600">Favorite Authors</h1>
            {favorites.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No favorite authors yet.</p>
                    <p className="text-gray-400">Add some authors to your favorites to see them here!</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {favorites
                        .filter((author: Author) => author && author.id) // Additional safety filter
                        .map((author: Author) => (
                            <AuthorCard 
                                key={String(author.id)} 
                                author={author} 
                                onHide={() => {}} 
                                onFavoriteChange={handleFavoriteChange}
                            />
                        ))
                    }
                </ul>
            )}
        </div>
    )
}
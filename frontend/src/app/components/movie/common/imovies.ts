export interface Imovies {
    results: Imovie[];
}

export interface Imovie {
    actors: string;
    title: string;
    releaseYear: string;
    description: string;
    rating: number;
    image: string;
    genre: [];
    writer: string;
    runtime: number;
    language: string;
}

export interface Igenre {
    id: number;
    imageUrl: string;
    title: string;
}

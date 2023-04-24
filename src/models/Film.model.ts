export interface Film {
    id: number
    original_title: string,
    poster_path: string,
    genres: Genre[],
    overview: string;
    vote_average: number,
    release_date: string
}


export interface Genre {
    id: number,
    name: string
}
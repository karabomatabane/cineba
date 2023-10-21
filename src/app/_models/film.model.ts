export interface Film {
    _id: string;
    name: string;
    imgUrl: string;
    voteCount: number;
    releaseDate: Date;
    screeningDate: Date;
    duration: number;
    language: string;
    filmDetail: string;
    active: boolean;
}

export interface tmdbFilm {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview?: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average?: number;
    vote_count?: number;
}

interface cast {
    name: string;
    character: string;
    imgUrl: string;
}

interface director {
    name: string;
    imgUrl: string;
}

export interface review {
    user: {_id: string, name: string};
    comment: string;
    rating: number;
    date: Date;
}

export interface FilmDetails {
    _id: string;
    name: string;
    imgUrl: string;
    voteCount: number;
    releaseDate: Date;
    screeningDate: Date;
    duration: number;
    language: string;
    filmDetail: {
        genre: string[];
        cast: cast[];
        director: director;
        overview: string;
        imdbUrl: string;
        reviews: review[];
    };
    active: boolean;
}
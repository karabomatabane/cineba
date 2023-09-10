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
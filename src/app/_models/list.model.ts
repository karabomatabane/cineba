import { Film } from "./film.model";

export interface Comment {
    user: {_id: string, username: string};
    message: string;
    date: Date;
}

export interface ListFilm {
  film: Film,
  user: {_id: string, username: string};
}

export interface ViewList {
    _id: string;
    name: string;
    imgUrl: string;
    description: string;
    lastUpdated: Date;
    active: boolean;
    private: boolean;
    films: ListFilm[];
    likes: string[];
    comments: Comment[];
    owner: {_id: string, username: string};
    members: string[];
}

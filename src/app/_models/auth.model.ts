import { Film } from "./film.model";

export interface registerUser {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface loginUser {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    role: string;
    votedFilms: Film[];
}
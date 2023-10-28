import { Film } from "./film.model";

export interface registerUser {
    username: string;
    password: string;
    confirmPassword: string;
    accountCode: string;
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

export interface AccountCode {
    _id: string;
    code: string;
    expirationDate: Date;
}

export interface NewAccountCode {
    code: string;
    daysValid: number;
}
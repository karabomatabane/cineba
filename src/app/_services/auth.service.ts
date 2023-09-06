import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginUser, registerUser } from '../_models/auth.model';

const TOKEN_KEY = 'authToken';
const VOTES_KEY = 'votes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: registerUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: loginUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  setVotes(votes: number = 1) {
    localStorage.setItem(VOTES_KEY, votes.toString());
  }

  getVotes(): number {
    return parseInt(localStorage.getItem(VOTES_KEY) || '0');
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
}

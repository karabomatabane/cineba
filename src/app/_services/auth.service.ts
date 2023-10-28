import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountCode, NewAccountCode, User, loginUser, registerUser } from '../_models/auth.model';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'authToken';
const VOTES_KEY = 'votes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();
  private userId: string | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.setToken(token);
    }
  }

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

  getUserId(): string | null {
    return this.userId;
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${this.userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/../user`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/../user/${userId}`);
  }

  getAccountCode(): Observable<AccountCode> {
    return this.http.get<AccountCode>(`${this.baseUrl}/account-code`);
  }

  createAccountCode(accountCode: NewAccountCode): Observable<AccountCode> {
    return this.http.post<AccountCode>(`${this.baseUrl}/account-code`, accountCode);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
    //decode token to get role
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.userId = tokenPayload._id;
    if (tokenPayload.role === 'admin') {
      this.isAdminSubject.next(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    this.userId = null;
  }
}

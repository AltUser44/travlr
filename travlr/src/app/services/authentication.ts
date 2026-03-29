import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api';
const tokenKey = 'travlr-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  /** Register a new admin and store the returned JWT */
  register(user: { name: string; email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${apiUrl}/register`, user).pipe(
      tap((res) => this.saveToken(res.token))
    );
  }

  /** Log in and store the returned JWT */
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${apiUrl}/login`, credentials).pipe(
      tap((res) => this.saveToken(res.token))
    );
  }

  /** Log out by removing the stored JWT */
  logout(): void {
    localStorage.removeItem(tokenKey);
  }

  /** Return the raw JWT string or null */
  getToken(): string | null {
    return localStorage.getItem(tokenKey);
  }

  /** Return true when a valid, unexpired token exists */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) { return false; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  /** Return the decoded JWT payload, or null if not logged in */
  getCurrentUser(): { name: string; email: string } | null {
    const token = this.getToken();
    if (!token) { return null; }
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }
}

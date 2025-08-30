import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Call backend login API
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);

    // Decode token and save role in lowercase
    const payload = this.decodeToken(token);
    if (payload?.role) {
      localStorage.setItem('role', payload.role.toLowerCase());
    }
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(payload);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isStaff(): boolean {
    return this.getRole() === 'staff';
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private static readonly TOKEN_KEY = 'access_token';

  setToken(token: string): void {
    localStorage.setItem(TokenService.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TokenService.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(TokenService.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    this.clearToken();
  }
}
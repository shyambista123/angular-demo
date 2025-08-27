import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiBaseUrl = environment.apiBaseUrl;

  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  authState$ = this.authState.asObservable();

  registerUser(data: { fullName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/register`, data, {
      headers: new HttpHeaders({
        'X-Skip-Global-Loader': 'true',
      }),
    });
  }

  loginUser(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiBaseUrl}/login`, data, {
        headers: new HttpHeaders({
          'X-Skip-Global-Loader': 'true',
        }),
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.authState.next(true);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  public userId$: Observable<number | null> = this.userIdSubject.asObservable();

  constructor() {
    this.decodeToken();
  }

  private decodeToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.userId ? Number(decoded.userId) : null;
        this.userIdSubject.next(userId);
      } catch (error) {
        this.userIdSubject.next(null);
      }
    } else {
      this.userIdSubject.next(null);
    }
  }

  public getUserId(): Observable<number | null> {
    return this.userId$;
  }
}

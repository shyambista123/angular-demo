import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  private apiBaseUrl = environment.apiBaseUrl;

  message: string = '';
  ngOnInit() {
    this.http.get(`${this.apiBaseUrl}/test`, { responseType: 'text' }).subscribe((res) => {
      this.message = res;
    });
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

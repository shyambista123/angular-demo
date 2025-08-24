import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  message: string = '';
  ngOnInit() {
    this.http.get('http://localhost:8080/test', { responseType: 'text' }).subscribe((res) => {
      this.message = res;
    });
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

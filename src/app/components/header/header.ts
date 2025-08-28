import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { Modal } from '../shared/modal/modal';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Modal],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  logoutModalOpen = signal(false);

  openLogoutModal() {
    this.logoutModalOpen.set(true);
  }

  closeLogoutModal() {
    this.logoutModalOpen.set(false);
  }

}

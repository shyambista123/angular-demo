import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroXCircle, heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, NgIcon, ReactiveFormsModule],
  viewProviders: provideIcons({ heroCheckCircle, heroXCircle, heroEye, heroEyeSlash }),
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;"\'<>,.?/~`\\\\|-]).{8,}$'
        ),
      ]),
    });
  }
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  errorMessage: string | null = null;

  isLoggingIn!: boolean;
  loginUser() {
    if (this.loginForm.valid) {
      this.isLoggingIn = true;
      this.authService
        .loginUser(this.loginForm.value)
        .pipe(finalize(() => (this.isLoggingIn = false)))
        .subscribe({
          next: (response) => {
            // console.log('User logged in successfully', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Something went wrong. Please try again.';
            }
          },
        });
    }
  }
}

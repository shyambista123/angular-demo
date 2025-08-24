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

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgIcon],
  viewProviders: provideIcons({ heroCheckCircle, heroXCircle, heroEye, heroEyeSlash }),
  templateUrl: './register.html',
  styles: ``,
})
export class Register {
  registerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    this.registerForm = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  errorMessage: string | null = null;

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful ', response);
          this.router.navigate(['/login']);
        },
              error: (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
      });
    }
  }
}

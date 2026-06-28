import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { finalize } from 'rxjs';

import { AuthService } from '../auth';
import { TokenService } from '../../../core/services/token';
import { ToastService } from '../../../shared/services/toast.service';
import { IconComponent } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IconComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly hidePassword = signal(true);

  protected readonly registerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected togglePassword(): void {
    this.hidePassword.update(value => !value);
  }

  protected register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.register(this.registerForm.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.tokenService.setToken(response.token);
          this.toast.show('Registration successful');

          this.router.navigate(['/profile'], {
            state: {
              prefill: {
                fullName: this.registerForm.controls.fullName.value,
                username: this.registerForm.controls.username.value,
                email: this.registerForm.controls.email.value
              }
            }
          });
        },
        error: error => {
          this.toast.show(error?.error?.message ?? 'Registration failed.');
        }
      });
  }
}

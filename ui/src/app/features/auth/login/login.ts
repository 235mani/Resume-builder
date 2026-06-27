import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { finalize } from 'rxjs';

import { AuthService } from '../auth';
import { TokenService } from '../../../core/services/token';
import { NavigationService } from '../../../core/services/navigation.service';
import { ToastService } from '../../../shared/services/toast.service';
import { IconComponent } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IconComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly navigationService = inject(NavigationService);
  private readonly toast = inject(ToastService);

  protected readonly hidePassword = signal(true);
  protected readonly loading = signal(false);

  protected readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected togglePassword(): void {
    this.hidePassword.update(value => !value);
  }

  protected login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.tokenService.setToken(response.token);
          this.toast.show('Login successful');
          this.navigationService.navigateAfterAuth();
        },
        error: error => {
          this.toast.show(
            error?.error?.message ?? 'Invalid email or password.'
          );
        }
      });
  }
}

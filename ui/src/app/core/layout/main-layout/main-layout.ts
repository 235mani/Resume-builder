import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { IconComponent } from '../../../shared/ui/icon/icon';
import { ToastService } from '../../../shared/services/toast.service';
import { TokenService } from '../../services/token';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    IconComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {

  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly sidebarOpen = signal(false);
  protected readonly isHandset = signal(false);

  constructor() {
    const mq = window.matchMedia('(max-width: 768px)');
    this.isHandset.set(mq.matches);
    mq.addEventListener('change', e => this.isHandset.set(e.matches));
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  protected closeSidebarOnMobile(): void {
    if (this.isHandset()) {
      this.sidebarOpen.set(false);
    }
  }

  protected logout(): void {
    this.tokenService.logout();
    this.toast.show('Signed out successfully');
    this.router.navigate(['/login']);
  }
}

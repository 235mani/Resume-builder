import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../services/toast.service';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './toast-host.html',
  styleUrl: './toast-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastHostComponent {

  protected readonly toastService = inject(ToastService);

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}

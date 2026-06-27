import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MODAL_DATA } from '../../tokens/modal-data.token';
import { ModalRef } from '../../services/modal-ref';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'primary' | 'danger';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  protected readonly data = inject<ConfirmDialogData>(MODAL_DATA);
  private readonly modalRef = inject(ModalRef<boolean>);

  protected confirm(): void {
    this.modalRef.close(true);
  }

  protected cancel(): void {
    this.modalRef.close(false);
  }
}

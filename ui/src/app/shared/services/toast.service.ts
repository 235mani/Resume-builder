import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly toasts = signal<Toast[]>([]);

  show(message: string, duration = 3200): void {
    const id = crypto.randomUUID();

    this.toasts.update(list => [...list, { id, message }]);

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}

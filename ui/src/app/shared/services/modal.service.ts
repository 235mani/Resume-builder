import { Injectable, Injector, Type, inject, signal } from '@angular/core';

import { MODAL_DATA } from '../tokens/modal-data.token';
import { ModalRef } from './modal-ref';

export interface ModalState {
  component: Type<unknown>;
  data: unknown;
  close: (result?: unknown) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly injector = inject(Injector);

  readonly state = signal<ModalState | null>(null);

  open<D = unknown, R = unknown>(
    component: Type<unknown>,
    data?: D
  ): Promise<R | undefined> {
    return new Promise<R | undefined>(resolve => {
      this.state.set({
        component,
        data: data ?? null,
        close: (result?: unknown) => {
          this.state.set(null);
          resolve(result as R | undefined);
        }
      });
    });
  }

  close(result?: unknown): void {
    this.state()?.close(result);
  }

  createInjector(data: unknown, modalRef: ModalRef): Injector {
    return Injector.create({
      providers: [
        { provide: MODAL_DATA, useValue: data },
        { provide: ModalRef, useValue: modalRef }
      ],
      parent: this.injector
    });
  }
}

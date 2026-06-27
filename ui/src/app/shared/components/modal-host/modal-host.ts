import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Type,
  computed,
  inject
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { ModalRef } from '../../services/modal-ref';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal-host.html',
  styleUrl: './modal-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHostComponent {

  protected readonly modalService = inject(ModalService);

  protected readonly view = computed(() => {
    const state = this.modalService.state();
    if (!state) {
      return null;
    }

    const modalRef = new ModalRef<unknown>(result => state.close(result));
    const injector = this.modalService.createInjector(state.data, modalRef);

    return {
      component: state.component as Type<unknown>,
      injector
    };
  });

  protected onBackdrop(): void {
    this.modalService.close();
  }
}

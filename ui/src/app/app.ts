import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ModalHostComponent } from './shared/components/modal-host/modal-host';
import { ToastHostComponent } from './shared/components/toast-host/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalHostComponent, ToastHostComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

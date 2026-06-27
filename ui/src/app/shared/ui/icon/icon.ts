import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';

import { ICON_PATHS, IconName } from '../icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="sizeClass()"
      aria-hidden="true">
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

  readonly name = input.required<IconName>();
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly paths = computed(() => {
    const raw = ICON_PATHS[this.name()];
    return Array.isArray(raw) ? raw : [raw];
  });

  protected readonly sizeClass = computed(() => `icon icon--${this.size()}`);
}

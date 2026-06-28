import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconComponent } from '../../../../shared/ui/icon/icon';
import { ResumeVersion } from '../../models/resume-version.models';
import { RESUME_TEMPLATES } from '../../models/resume-version.models';

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './resume-card.html',
  styleUrl: './resume-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeCardComponent {

  @Input({ required: true })
  resume!: ResumeVersion;

  @Output()
  edit = new EventEmitter<ResumeVersion>();

  @Output()
  delete = new EventEmitter<ResumeVersion>();

  @Output()
  publish = new EventEmitter<ResumeVersion>();

  @Output()
  unpublish = new EventEmitter<ResumeVersion>();

  protected readonly menuOpen = signal(false);

  @HostListener('document:click')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen.update(v => !v);
  }

  protected onEdit(): void {
    this.menuOpen.set(false);
    this.edit.emit(this.resume);
  }

  protected onDelete(): void {
    this.menuOpen.set(false);
    this.delete.emit(this.resume);
  }

  protected onPublish(): void {
    this.menuOpen.set(false);
    this.publish.emit(this.resume);
  }

  protected onUnpublish(): void {
    this.menuOpen.set(false);
    this.unpublish.emit(this.resume);
  }

  protected readonly templates = Object.fromEntries(
    RESUME_TEMPLATES.map(t => [t.value, t.label])
  );
}

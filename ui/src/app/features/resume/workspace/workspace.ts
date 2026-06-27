import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { finalize } from 'rxjs';

import { ResumeVersionService } from '../services/resume-version.service';
import { ResumeVersion } from '../models/resume-version.models';
import {
  ResumeVersionDialogComponent,
  ResumeVersionDialogResult
} from '../components/resume-version-dialog/resume-version-dialog';
import { SkillListComponent } from '../../skills/skill-list/skill-list';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ModalService } from '../../../shared/services/modal.service';
import { ToastService } from '../../../shared/services/toast.service';
import { IconComponent } from '../../../shared/ui/icon/icon';
import { getApiErrorMessage } from '../../../core/utils/error.util';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkillListComponent,
    LoadingSpinner,
    IconComponent
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly resumeService = inject(ResumeVersionService);
  private readonly toast = inject(ToastService);
  private readonly modal = inject(ModalService);

  protected readonly resume = signal<ResumeVersion | null>(null);
  protected readonly resumeId = signal<number>(0);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly saving = signal(false);
  protected readonly activeTab = signal<'overview' | 'skills'>('overview');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('resumeId'));

    if (!id || Number.isNaN(id)) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.resumeId.set(id);
    this.loadResume(id);
  }

  protected setTab(tab: 'overview' | 'skills'): void {
    this.activeTab.set(tab);
  }

  protected loadResume(id: number): void {

    this.loading.set(true);
    this.error.set(false);

    this.resumeService.getById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: resume => this.resume.set(resume),
        error: () => this.error.set(true)
      });
  }

  protected async openEditDialog(): Promise<void> {

    const current = this.resume();
    if (!current) {
      return;
    }

    const result = await this.modal.open<
      { resume: ResumeVersion },
      ResumeVersionDialogResult
    >(ResumeVersionDialogComponent, { resume: current });

    if (!result) {
      return;
    }

    this.saving.set(true);

    this.resumeService.update(current.id, result.request)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: updated => {
          this.resume.set(updated);
          this.toast.show('Resume updated.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to update resume.'));
        }
      });
  }

  protected togglePublish(): void {

    const current = this.resume();
    if (!current) {
      return;
    }

    this.saving.set(true);

    const request$ = current.isPublic
      ? this.resumeService.unpublish(current.id)
      : this.resumeService.publish(current.id);

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: updated => {
          this.resume.set(updated);
          this.toast.show(updated.isPublic ? 'Resume published.' : 'Resume unpublished.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to update publish status.'));
        }
      });
  }
}

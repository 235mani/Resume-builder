import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { finalize } from 'rxjs';

import { ResumeCardComponent } from '../components/resume-card/resume-card';
import {
  ResumeVersionDialogComponent,
  ResumeVersionDialogResult
} from '../components/resume-version-dialog/resume-version-dialog';
import { ResumeVersionService } from '../services/resume-version.service';
import { ResumeVersion } from '../models/resume-version.models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ModalService } from '../../../shared/services/modal.service';
import { ToastService } from '../../../shared/services/toast.service';
import { IconComponent } from '../../../shared/ui/icon/icon';
import { getApiErrorMessage } from '../../../core/utils/error.util';

@Component({
  selector: 'app-resume-versions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ResumeCardComponent,
    LoadingSpinner,
    IconComponent
  ],
  templateUrl: './resume-versions.html',
  styleUrl: './resume-versions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeVersionsComponent implements OnInit {

  private readonly resumeService = inject(ResumeVersionService);
  private readonly toast = inject(ToastService);
  private readonly modal = inject(ModalService);

  protected readonly resumes = signal<ResumeVersion[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly profileMissing = signal(false);
  protected readonly actionLoading = signal(false);

  ngOnInit(): void {
    this.loadResumes();
  }

  protected loadResumes(): void {

    this.loading.set(true);
    this.error.set(false);
    this.profileMissing.set(false);

    this.resumeService.getAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: resumes => this.resumes.set(resumes),
        error: err => {
          if (err.status === 404) {
            this.profileMissing.set(true);
            return;
          }
          this.error.set(true);
          this.toast.show(getApiErrorMessage(err, 'Failed to load resume versions.'));
        }
      });
  }

  protected openCreateDialog(): void {
    this.openDialog();
  }

  protected openEditDialog(resume: ResumeVersion): void {
    this.openDialog(resume);
  }

  protected confirmDelete(resume: ResumeVersion): void {
    this.modal.open<ConfirmDialogData, boolean>(ConfirmDialogComponent, {
      title: 'Delete resume version',
      message: `Are you sure you want to delete "${resume.name}"? This action cannot be undone.`,
      confirmLabel: 'Delete',
      confirmColor: 'danger'
    }).then(confirmed => {
      if (confirmed) {
        this.deleteResume(resume.id);
      }
    });
  }

  protected togglePublish(resume: ResumeVersion): void {

    this.actionLoading.set(true);

    const request$ = resume.isPublic
      ? this.resumeService.unpublish(resume.id)
      : this.resumeService.publish(resume.id);

    request$
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: updated => {
          this.updateLocalResume(updated);
          this.toast.show(updated.isPublic ? 'Resume published.' : 'Resume unpublished.');
        },
        error: () => this.toast.show('Failed to update publish status.')
      });
  }

  private async openDialog(resume?: ResumeVersion): Promise<void> {

    const result = await this.modal.open<
      { resume?: ResumeVersion },
      ResumeVersionDialogResult
    >(ResumeVersionDialogComponent, { resume });

    if (!result) {
      return;
    }

    if (resume) {
      this.updateResume(resume.id, result.request);
    } else {
      this.createResume(result.request);
    }
  }

  private createResume(request: ResumeVersionDialogResult['request']): void {

    this.actionLoading.set(true);

    this.resumeService.create(request)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: created => {
          this.resumes.update(list => [created, ...list]);
          this.toast.show('Resume version created.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to create resume version.'));
        }
      });
  }

  private updateResume(id: number, request: ResumeVersionDialogResult['request']): void {

    this.actionLoading.set(true);

    this.resumeService.update(id, request)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: updated => {
          this.updateLocalResume(updated);
          this.toast.show('Resume version updated.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to update resume version.'));
        }
      });
  }

  private deleteResume(id: number): void {

    this.actionLoading.set(true);

    this.resumeService.delete(id)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: () => {
          this.resumes.update(list => list.filter(r => r.id !== id));
          this.toast.show('Resume version deleted.');
        },
        error: () => this.toast.show('Failed to delete resume version.')
      });
  }

  private updateLocalResume(updated: ResumeVersion): void {
    this.resumes.update(list =>
      list.map(item => item.id === updated.id ? updated : item)
    );
  }
}

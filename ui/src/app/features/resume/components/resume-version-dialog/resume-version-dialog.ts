import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MODAL_DATA } from '../../../../shared/tokens/modal-data.token';
import { ModalRef } from '../../../../shared/services/modal-ref';
import {
  RESUME_TEMPLATES,
  ResumeVersion,
  ResumeVersionRequest
} from '../../models/resume-version.models';

export interface ResumeVersionDialogData {
  resume?: ResumeVersion;
}

export interface ResumeVersionDialogResult {
  request: ResumeVersionRequest;
}

@Component({
  selector: 'app-resume-version-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resume-version-dialog.html',
  styleUrl: './resume-version-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeVersionDialogComponent {

  private readonly fb = inject(FormBuilder);
  private readonly modalRef = inject(ModalRef<ResumeVersionDialogResult>);
  protected readonly data = inject<ResumeVersionDialogData>(MODAL_DATA);

  protected readonly templates = RESUME_TEMPLATES;
  protected readonly isEdit = !!this.data.resume;

  protected readonly form = this.fb.nonNullable.group({
    name: [this.data.resume?.name ?? '', [Validators.required, Validators.maxLength(100)]],
    displayTitle: [this.data.resume?.displayTitle ?? '', [Validators.required, Validators.maxLength(100)]],
    professionalSummary: [this.data.resume?.professionalSummary ?? '', Validators.maxLength(5000)],
    template: [this.data.resume?.template ?? 'CLASSIC', Validators.required]
  });

  protected save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalRef.close({ request: this.form.getRawValue() });
  }

  protected cancel(): void {
    this.modalRef.close();
  }
}

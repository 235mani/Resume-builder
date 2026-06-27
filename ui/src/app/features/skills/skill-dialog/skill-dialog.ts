import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MODAL_DATA } from '../../../shared/tokens/modal-data.token';
import { ModalRef } from '../../../shared/services/modal-ref';
import { Skill } from '../models/skill.models';

export interface SkillDialogData {
  skill?: Skill;
  nextDisplayOrder: number;
}

export interface SkillDialogResult {
  name: string;
  displayOrder: number;
}

@Component({
  selector: 'app-skill-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skill-dialog.html',
  styleUrl: './skill-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillDialogComponent {

  private readonly fb = inject(FormBuilder);
  private readonly modalRef = inject(ModalRef<SkillDialogResult>);
  protected readonly data = inject<SkillDialogData>(MODAL_DATA);

  protected readonly isEdit = !!this.data.skill;

  protected readonly form = this.fb.nonNullable.group({
    name: [this.data.skill?.name ?? '', [Validators.required, Validators.maxLength(100)]],
    displayOrder: [
      this.data.skill?.displayOrder ?? this.data.nextDisplayOrder,
      [Validators.required, Validators.min(0)]
    ]
  });

  protected save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalRef.close(this.form.getRawValue());
  }

  protected cancel(): void {
    this.modalRef.close();
  }
}

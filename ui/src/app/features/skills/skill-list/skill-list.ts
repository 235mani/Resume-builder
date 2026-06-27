import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { finalize } from 'rxjs';

import { SkillService } from '../services/skill.service';
import { Skill } from '../models/skill.models';
import {
  SkillDialogComponent,
  SkillDialogResult
} from '../skill-dialog/skill-dialog';
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
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, IconComponent],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillListComponent implements OnInit {

  readonly resumeVersionId = input.required<number>();

  private readonly skillService = inject(SkillService);
  private readonly toast = inject(ToastService);
  private readonly modal = inject(ModalService);

  protected readonly skills = signal<Skill[]>([]);
  protected readonly loading = signal(false);
  protected readonly actionLoading = signal(false);

  ngOnInit(): void {
    this.loadSkills();
  }

  protected loadSkills(): void {

    this.loading.set(true);

    this.skillService.getAll(this.resumeVersionId())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: skills => this.skills.set(skills),
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to load skills.'));
        }
      });
  }

  protected openCreateDialog(): void {
    this.openDialog(undefined, this.nextDisplayOrder());
  }

  protected openEditDialog(skill: Skill): void {
    this.openDialog(skill, skill.displayOrder);
  }

  protected confirmDelete(skill: Skill): void {
    this.modal.open<ConfirmDialogData, boolean>(ConfirmDialogComponent, {
      title: 'Delete skill',
      message: `Remove "${skill.name}" from this resume?`,
      confirmLabel: 'Delete',
      confirmColor: 'danger'
    }).then(confirmed => {
      if (confirmed) {
        this.deleteSkill(skill.id);
      }
    });
  }

  private async openDialog(skill: Skill | undefined, nextDisplayOrder: number): Promise<void> {

    const result = await this.modal.open<
      { skill?: Skill; nextDisplayOrder: number },
      SkillDialogResult
    >(SkillDialogComponent, { skill, nextDisplayOrder });

    if (!result) {
      return;
    }

    if (skill) {
      this.updateSkill(skill.id, result);
    } else {
      this.createSkill(result);
    }
  }

  private createSkill(request: SkillDialogResult): void {

    this.actionLoading.set(true);

    this.skillService.create(this.resumeVersionId(), request)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: created => {
          this.skills.update(list => [...list, created].sort(sortByOrder));
          this.toast.show('Skill added.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to add skill.'));
        }
      });
  }

  private updateSkill(skillId: number, request: SkillDialogResult): void {

    this.actionLoading.set(true);

    this.skillService.update(this.resumeVersionId(), skillId, request)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: updated => {
          this.skills.update(list =>
            list.map(s => s.id === updated.id ? updated : s).sort(sortByOrder)
          );
          this.toast.show('Skill updated.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to update skill.'));
        }
      });
  }

  private deleteSkill(skillId: number): void {

    this.actionLoading.set(true);

    this.skillService.delete(this.resumeVersionId(), skillId)
      .pipe(finalize(() => this.actionLoading.set(false)))
      .subscribe({
        next: () => {
          this.skills.update(list => list.filter(s => s.id !== skillId));
          this.toast.show('Skill deleted.');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to delete skill.'));
        }
      });
  }

  private nextDisplayOrder(): number {
    const list = this.skills();
    if (list.length === 0) {
      return 0;
    }
    return Math.max(...list.map(s => s.displayOrder)) + 1;
  }
}

function sortByOrder(a: Skill, b: Skill): number {
  return a.displayOrder - b.displayOrder;
}

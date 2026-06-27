import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { finalize } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import {
  MasterProfile,
  ProfilePrefill
} from '../models/master-profile.models';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ToastService } from '../../../shared/services/toast.service';
import { IconComponent } from '../../../shared/ui/icon/icon';
import { getApiErrorMessage } from '../../../core/utils/error.util';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoadingSpinner,
    IconComponent
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly profile = signal<MasterProfile | null>(null);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editing = signal(false);
  protected readonly isNew = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.maxLength(20)],
    location: ['', Validators.maxLength(100)],
    linkedin: [''],
    github: [''],
    portfolio: [''],
    photoUrl: ['']
  });

  ngOnInit(): void {
    this.applyPrefill();
    this.loadProfile();
  }

  protected startEdit(): void {
    const current = this.profile();
    if (current) {
      this.patchForm(current);
    }
    this.editing.set(true);
  }

  protected cancelEdit(): void {
    if (this.isNew()) {
      return;
    }
    const current = this.profile();
    if (current) {
      this.patchForm(current);
    }
    this.editing.set(false);
  }

  protected save(): void {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const request = this.form.getRawValue();

    const save$ = this.isNew()
      ? this.profileService.createProfile(request)
      : this.profileService.updateProfile(request);

    save$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: saved => {
          this.profile.set(saved);
          this.isNew.set(false);
          this.editing.set(false);
          this.toast.show('Profile saved successfully');
        },
        error: err => {
          this.toast.show(getApiErrorMessage(err, 'Failed to save profile.'));
        }
      });
  }

  private loadProfile(): void {

    this.loading.set(true);

    this.profileService.getMyProfile()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: profile => {
          this.profile.set(profile);
          this.patchForm(profile);
        },
        error: err => {
          if (err.status === 404) {
            this.isNew.set(true);
            this.editing.set(true);
            return;
          }
          this.toast.show(getApiErrorMessage(err, 'Failed to load profile.'));
        }
      });
  }

  private applyPrefill(): void {
    const prefill = history.state?.prefill as ProfilePrefill | undefined;
    if (!prefill) {
      return;
    }
    this.form.patchValue({
      firstName: prefill.firstName ?? '',
      lastName: prefill.lastName ?? '',
      email: prefill.email ?? ''
    });
  }

  private patchForm(profile: MasterProfile): void {
    this.form.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone ?? '',
      location: profile.location ?? '',
      linkedin: profile.linkedin ?? '',
      github: profile.github ?? '',
      portfolio: profile.portfolio ?? '',
      photoUrl: profile.photoUrl ?? ''
    });
  }
}

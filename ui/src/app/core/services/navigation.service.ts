import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ProfileService } from '../../features/profile/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly router = inject(Router);
  private readonly profileService = inject(ProfileService);

  navigateAfterAuth(): void {
    this.profileService.getMyProfile().pipe(
      map(() => true),
      catchError(() => of(false))
    ).subscribe(hasProfile => {
      this.router.navigate([hasProfile ? '/resumes' : '/profile']);
    });
  }
}

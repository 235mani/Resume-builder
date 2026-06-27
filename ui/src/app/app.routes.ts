import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },

  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login').then(c => c.LoginComponent)
  },

  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register').then(c => c.RegisterComponent)
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout').then(
        c => c.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'resumes'
      },

      {
        path: 'resumes',
        loadComponent: () =>
          import('./features/resume/resume-versions/resume-versions').then(
            c => c.ResumeVersionsComponent
          )
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile/profile').then(
            c => c.ProfileComponent
          )
      },

      {
        path: 'workspace/:resumeId',
        loadComponent: () =>
          import('./features/resume/workspace/workspace').then(
            c => c.WorkspaceComponent
          )
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

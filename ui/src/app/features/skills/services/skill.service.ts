import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Skill, SkillRequest } from '../models/skill.models';
import { API } from '../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly http = inject(HttpClient);

  private baseUrl(resumeVersionId: number): string {
    return `${environment.apiUrl}${API.RESUME_VERSIONS}/${resumeVersionId}/skills`;
  }

  getAll(resumeVersionId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseUrl(resumeVersionId));
  }

  getById(resumeVersionId: number, skillId: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.baseUrl(resumeVersionId)}/${skillId}`);
  }

  create(resumeVersionId: number, request: SkillRequest): Observable<Skill> {
    return this.http.post<Skill>(this.baseUrl(resumeVersionId), request);
  }

  update(
    resumeVersionId: number,
    skillId: number,
    request: SkillRequest
  ): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.baseUrl(resumeVersionId)}/${skillId}`,
      request
    );
  }

  delete(resumeVersionId: number, skillId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl(resumeVersionId)}/${skillId}`
    );
  }
}

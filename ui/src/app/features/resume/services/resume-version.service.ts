import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ResumeVersion,
  ResumeVersionRequest
} from '../models/resume-version.models';
import { API } from '../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ResumeVersionService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}${API.RESUME_VERSIONS}`;

  getAll(): Observable<ResumeVersion[]> {
    return this.http.get<ResumeVersion[]>(this.baseUrl);
  }

  getById(id: number): Observable<ResumeVersion> {
    return this.http.get<ResumeVersion>(`${this.baseUrl}/${id}`);
  }

  create(request: ResumeVersionRequest): Observable<ResumeVersion> {
    return this.http.post<ResumeVersion>(this.baseUrl, request);
  }

  update(id: number, request: ResumeVersionRequest): Observable<ResumeVersion> {
    return this.http.put<ResumeVersion>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  publish(id: number): Observable<ResumeVersion> {
    return this.http.patch<ResumeVersion>(`${this.baseUrl}/${id}/publish`, {});
  }

  unpublish(id: number): Observable<ResumeVersion> {
    return this.http.patch<ResumeVersion>(`${this.baseUrl}/${id}/unpublish`, {});
  }
}

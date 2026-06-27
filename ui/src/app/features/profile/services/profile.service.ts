import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  MasterProfile,
  MasterProfileRequest
} from '../models/master-profile.models';
import { API } from '../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}${API.PROFILE}`;

  getMyProfile(): Observable<MasterProfile> {
    return this.http.get<MasterProfile>(this.baseUrl);
  }

  createProfile(request: MasterProfileRequest): Observable<MasterProfile> {
    return this.http.post<MasterProfile>(this.baseUrl, request);
  }

  updateProfile(request: MasterProfileRequest): Observable<MasterProfile> {
    return this.http.put<MasterProfile>(this.baseUrl, request);
  }
}

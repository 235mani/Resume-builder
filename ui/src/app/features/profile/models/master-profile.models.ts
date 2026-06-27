export interface MasterProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  photoUrl: string | null;
}

export interface MasterProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photoUrl?: string;
}

export interface ProfilePrefill {
  firstName?: string;
  lastName?: string;
  email?: string;
}

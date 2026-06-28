export type ResumeTemplate =
  | 'CLASSIC'
  | 'MODERN'
  | 'MINIMAL'
  | 'DEVELOPER'
  | 'ATS_Friendly';

export interface ResumeVersion {
  id: number;
  name: string;
  displayTitle: string;
  professionalSummary: string;
  template: ResumeTemplate;
  slug: string;
  isPublic: boolean;
}

export interface ResumeVersionRequest {
  name: string;
  displayTitle: string;
  professionalSummary: string;
  template: ResumeTemplate;
}

export const RESUME_TEMPLATES: { value: ResumeTemplate; label: string }[] = [
  { value: 'CLASSIC', label: 'Classic' },
  { value: 'MODERN', label: 'Modern' },
  { value: 'MINIMAL', label: 'Minimal' },
  { value: 'DEVELOPER', label: 'Developer' },
  { value: 'ATS_Friendly', label: 'ATS Friendly' }
];

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience_years: number | null;
  bio: string | null;
  photo: string | null;
  is_popular: number;
  specialties: string[];
  certifications: string[];
}

export interface TeamResponse {
  code: number;
  status: boolean;
  message: string;
  data: TeamMember[];
}

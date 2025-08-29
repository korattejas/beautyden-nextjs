export interface Hiring {
  id: string;
  title: string;
  description: string;
  city: string;
  min_experience: string;
  max_experience: string | null;
  salary_range: string;
  experience_level: string;
  hiring_type: string;
  gender_preference: string;
  required_skills: string[];
  is_popular: string;
  experience_level_text: string;
  hiring_type_text: string;
  gender_preference_text: string;
}

export interface HiringResponse {
  code: number;
  status: boolean;
  message: string;
  data: Hiring[];
}

export interface HiringFilters {
  search?: string;
  city?: string;
  experienceLevel?: string;
}

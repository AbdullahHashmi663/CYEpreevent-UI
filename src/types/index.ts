export interface CompetitionRegistration {
  id?: string;
  full_name: string;
  email: string;
  university: string;
  phone?: string;
  competition: string;
  image_url?: string;
  created_at?: string;
}

export interface AmbassadorApplication {
  id?: string;
  full_name: string;
  phone?: string;
  email?: string;
  university: string;
  department: string;
  semester: string;
  motivation: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  description?: string;
  sort_order: number;
  created_at?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  image_url: string;
  display_image_url?: string;
  sort_order: number;
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

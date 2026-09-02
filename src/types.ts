export type SentimentType = 'Positive' | 'Neutral' | 'Negative';
export type PostStatus = 'Published' | 'Draft' | 'Archived';
export type MediaType = 'Print Media' | 'Electronic Media' | 'Social Media' | 'Digital / Web';

export interface NewsItem {
  id: string;
  srNo: number;
  title: string;
  source: string;
  subSource: string;
  zone: string;
  division: string;
  department: string;
  subDepartment: string;
  state: string;
  city: string;
  date: string;
  time: string;
  originUrl?: string;
  mediaType: MediaType;
  imageUrl?: string;
  sentiment: SentimentType;
  roleName: string;
  status: PostStatus;
  accidentalNotification: boolean;
  description: string;
  clipImage?: string;
  views?: number;
  likes?: number;
}

export interface AdminUser {
  id: string;
  srNo: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Active' | 'Blocked' | 'Inactive';
}

export interface AppUser {
  id: string;
  srNo: number;
  name: string;
  username: string;
  phone: string;
  email?: string;
  status: 'Active' | 'Blocked' | 'Inactive';
}

export interface RoleItem {
  id: string;
  srNo: number;
  name: string;
  permissions: string[];
}

export interface MasterDepartment {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
  subDepartments?: string[];
}

export interface MasterDivision {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
}

export interface MasterSource {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
  subSources?: string[];
}

export interface MasterState {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
}

export interface MasterCity {
  id: number;
  name: string;
  pinCode: string;
  state: string;
  createdDate: string;
  updatedDate: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  division?: string;
  department?: string;
  avatarUrl?: string;
}

export type AdminViewType =
  | 'dashboard'
  | 'admin_list'
  | 'app_user_list'
  | 'role_list'
  | 'news_post_list'
  | 'add_news_post'
  | 'edit_news_post'
  | 'department_list'
  | 'division_list'
  | 'source_list'
  | 'state_list'
  | 'city_list'
  | 'report';

export type UserViewType =
  | 'home'
  | 'all_news'
  | 'news_detail'
  | 'category_view';

// types/index.ts

// Type for the user data returned upon login/signup
export interface UserAuthData {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'partner' | 'admin';
  avatarUrl: string;
  businessCategory: string;
  token: string;
}

// Type for the Auth Context state
export interface AuthContextType {
  user: UserAuthData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: { name: string; email: string; password: string; businessCategory?: string; role?: 'user' | 'partner' | 'admin' }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// Type for the protected profile data (subset of UserAuthData)
export interface UserProfileData {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'partner' | 'admin';
    address: string;
    points: number;
}

// Loại (Type) mới cho Review/Post
export interface ReviewData {
    _id: string;
    userId: { _id: string; name: string; email: string; }; // Populated User
    serviceId?: string; // Tùy chọn, nếu đây là post không phải review
    rating?: number; // Tùy chọn, chỉ có khi là review
    text: string;
    images: string[];
    likes: string[]; // Chỉ chứa mảng User IDs đã like
    createdAt: string;
}

// Loại (Type) mới cho Booking Input
export interface BookingInput {
    serviceId: string;
    date: string; // Định dạng YYYY-MM-DD
    time: string; // Định dạng HH:MM
    people: number;
}

// Type cho User (Partner) khi được populate trong Service
export interface ServicePartner {
    _id: string;
    name: string;
    email: string;
}

// Dữ liệu Service nhận từ Backend (đã được populate partnerId)
export interface ServiceData {
    _id: string;
    partnerId: ServicePartner; // Partner object đã được populate
    name: string;
    type: 'restaurant' | 'hotel' | 'spa' | 'clinic' | 'other';
    description: string;
    images: string[];
    address: string;
    city: string;
    priceRange: string;
    rating: number; // Rating trung bình
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
}

// Type cho Input khi tạo/cập nhật Service
export interface ServiceFormInput {
    name: string;
    type: 'restaurant' | 'hotel' | 'spa' | 'clinic' | 'other';
    description: string;
    address: string;
    city: string;
    priceRange: string;
    images: string[];
}

export interface FriendData {
  id: string;
  name: string;
  avatarUrl?: string;
  mutualCount?: number;
}

export interface MessageData {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export interface NotificationData {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// types/index.ts
export interface PostData {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  type: 'status' | 'review' | 'music';
  mood?: string; // ví dụ: "😄 Vui vẻ", "😔 Buồn"
  music?: string; // Spotify link
  serviceId?: {
    _id: string;
    name: string;
  };
  rating?: number;
  likes: string[];
  createdAt: string;
  comments?: CommentData[];
}

export interface CommentData {
  _id: string;
  text: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}
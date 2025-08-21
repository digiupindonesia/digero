export type Member = {
  id: string;
  name: string;
  email: string;
  phone: number;
  accountLinked: string[];
  fee: number;
  suspended: boolean;
};

export type ListReqAccount = {
  id: string;
  datetime: string;
  name: string;
  accountName: string;
  idbc: string;
  status: "pending" | "processing" | "added";
};

export type ListReqTopUp = {
  id: string;
  datetime: string;
  name: string;
  accountName: string;
  price: number;
  fee: number;
  status: "pending" | "processing" | "complete";
};

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: "USER" | "ADMIN" | string; // kalau role bisa lebih dari USER/ADMIN
    avatar: string | null;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}


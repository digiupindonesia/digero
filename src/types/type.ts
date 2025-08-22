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

// Kunci status yang valid
type StatusKey = "PENDING" | "PAID" | "EXPIRED" | "CANCELED";

// Detail per status
interface StatusDetail {
  count: number;
  percent: number;
}

// Rentang tanggal (ISO string)
interface DateRange {
  from: string; // e.g. "2025-08-15T00:00:00.000Z"
  to: string;   // e.g. "2025-08-22T23:59:59.999Z"
}

// Payload utama sesuai struktur Anda
export interface SummaryAdmin {
  dateRange: DateRange;
  membersCount: number;
  memberTopupCount: number;
  avgTopupFreq: number;
  totalNominalTopup: number;
  totalFeeTopup: number;
  avgNominalTopup: number;
  totalTopups: number;
  statusBreakdown: Record<StatusKey, StatusDetail>;
}

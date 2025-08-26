// dummy
export interface Member {
  id: string;
  memberName: string;
  email: string;
  whatsappNumber: string | null;
  feePercent: number;
  isActive: boolean;
  isVerified: boolean;
  lastLoginAt: string; // bisa juga Date jika Anda parse ke objek Date
  createdAt: string; // sama, bisa Date tergantung kebutuhan
}

// export type ListReqTopUp = {
//   id: string;
//   datetime: string;
//   name: string;
//   accountName: string;
//   price: number;
//   fee: number;
//   status: "pending" | "processing" | "complete";
// };

// real
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    feePercent: number;
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
  to: string; // e.g. "2025-08-22T23:59:59.999Z"
}

// Payload utama sesuai struktur Anda
export interface Summary {
  dateRange: DateRange;
  membersCount: number; // admin
  memberTopupCount: number; // admin
  avgTopupFreq: number; // admin
  totalNominalTopup: number; // admin // user
  totalFeeTopup: number; // admin
  avgNominalTopup: number; // admin // user
  totalTopups: number;
  statusBreakdown: Record<StatusKey, StatusDetail>;
}

// Status permintaan (dapat ditambah sesuai kebutuhan domain)
type AccountRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";

// Representasi user yang melakukan request
interface RequestedBy {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
}

// Payload utama sesuai struktur yang diberikan
export interface ListReqAccount {
  id: string;
  accountName: string;
  businessCenterId: string; // gunakan string karena ID bisa sangat panjang
  status: AccountRequestStatus;
  rejectionReason: string | null;
  requestedByUserId: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  requestedBy: RequestedBy;
}

type PaymentMethod = "BCA" | "MANDIRI";

// Nested object
export interface AccountRequest {
  id: string;
  accountName: string;
  businessCenterId: string;
  status: "APPROVED" | "PENDING" | "REJECTED"; // bisa disesuaikan
}

// Main object
export interface TopUp {
  id: string;
  userId: string;
  accountRequestId: string;
  amount: number;
  feePercent: number;
  feeAmount: number;
  uniqueCode: number;
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod; // bisa dibuat enum: "BCA" | "MANDIRI" | "BNI" dsb.
  status: "PENDING" | "PAID" | "EXPIRED" | "CANCELED"; // disesuaikan dengan sistem Anda
  paidAt: string | null; // ISO date string atau null
  expiredAt: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  accountRequest: AccountRequest;
  user: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
}

export type TrendDashboard = {
  dateRange: {
    from: string; // ISO Date string
    to: string;   // ISO Date string
  };
  granularity: "day" | "week" | "month" | "year"; // bisa dibuat union type
  data: {
    label: string;
    totalNominalTopup: number;
    totalFeeTopup: number;
    count: number;
  }[];
};

export type TopMember = {
  rank: number;
  userId: string;
  username: string;
  fullName: string | null;
  email: string;
  topupCount: number;
  totalNominalTopup: number;
  totalFeeTopup: number;
};
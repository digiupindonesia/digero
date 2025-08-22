// dummy
export type Member = {
  id: string;
  name: string;
  email: string;
  phone: number;
  accountLinked: string[];
  fee: number;
  suspended: boolean;
};

// export type ListReqAccount = {
//   id: string;
//   datetime: string;
//   name: string;
//   accountName: string;
//   idbc: string;
//   status: "pending" | "processing" | "added";
// };

export type ListReqTopUp = {
  id: string;
  datetime: string;
  name: string;
  accountName: string;
  price: number;
  fee: number;
  status: "pending" | "processing" | "complete";
};

// real
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    feePercent:number;
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


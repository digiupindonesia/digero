import { toast } from "react-toastify";

type NotifyType = "success" | "error" | "default";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast(msg), // default
};

export type { NotifyType };
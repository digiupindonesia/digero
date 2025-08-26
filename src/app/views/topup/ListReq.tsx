import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqTopUp/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { columns } from "@/components/ReqTopUp/columns";
import { createColumns } from "@/components/ReqTopUp/columns";
import { TopUp } from "@/types/type";
import { notify } from "@/utils/notify";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { ToastContainer } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_LIST_REQ_TOPUP = `${API_URL}/api/v1/payment`;
const POST_MOVE_TO_PAID = `${API_URL}/api/v1/payment/bulk/mark-paid`;
const POST_MOVE_TO_CANCEL = `${API_URL}/api/v1/payment/bulk/cancel`;

export default function ListReq() {
  const { auth, isHydrated } = useAuthStore();
  const [listReqTopUp, setListReqTopUp] = useState<TopUp[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getListTopUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_LIST_REQ_TOPUP, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        setListReqTopUp(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      notify.error("Error fetching top-up requests.");
      console.log("Error fetching top-up requests:", error);
    }
  };

  const handleMoveToPaid = async (id: string) => {
    const idsArray = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );

    // Prioritaskan id dari parameter, jika tidak ada gunakan idsArray
    const ids = id ? [id] : idsArray;

    // Validasi jika tidak ada ID yang akan diproses
    if (ids.length === 0) {
      notify.error("No items to approve");
      return;
    }

    try {
      const response = await axios.post(
        `${POST_MOVE_TO_PAID}`,
        {
          ids: ids,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Clear selection dan reset global state setelah berhasil
        setRowSelection({});
        getListTopUp();
        notify.success("Status updated successfully");
      }
    } catch (error: any) {
      notify.error("Error moving to paid.");
      console.error("Error moving to paid:", error);
    }
  };

  const handleMoveToCancel = async (id: string) => {
    const idsArray = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );

    // Prioritaskan id dari parameter, jika tidak ada gunakan idsArray
    const ids = id ? [id] : idsArray;

    // Validasi jika tidak ada ID yang akan diproses
    if (ids.length === 0) {
      notify.error("No items to approve");
      return;
    }

    try {
      const response = await axios.post(
        `${POST_MOVE_TO_CANCEL}`,
        {
          ids: ids,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Clear selection dan reset global state setelah berhasil
        setRowSelection({});
        getListTopUp();
        notify.success("Status updated successfully");
      }
    } catch (error: any) {
      notify.error("Error moving to cancel.");
      console.error("Error moving to cancel:", error);
    }
  };

  const columns = useMemo(
    () =>
      createColumns({
        onPaid: handleMoveToPaid,
        onCancel: handleMoveToCancel,
      }),
    []
  );

  useEffect(() => {
    if (isHydrated && auth) {
      getListTopUp();
    }
  }, [auth, isHydrated]);

  return (
    <>
      <ToastContainer />
      <ContainerComponent title="List Request">
        <div className="md:bg-white md:rounded-lg md:p-10">
          <DataTable
            columns={columns}
            data={listReqTopUp}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            moveToPaid={handleMoveToPaid}
            moveToCancel={handleMoveToCancel}
            getListTopUp={getListTopUp}
            isLoading={isLoading}
          />
        </div>
      </ContainerComponent>
    </>
  );
}

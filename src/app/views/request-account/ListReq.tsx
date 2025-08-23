import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqAccount/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { columns } from "@/components/ReqAccount/columns";
import { ListReqAccount } from "@/types/type";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notify } from "@/utils/notify";
import { createColumns } from "@/components/ReqAccount/columns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_LIST_REQ_ACC = `${API_URL}/api/v1/account-requests`;
const PUT_UPDATE_STATUS_REQ_ACC = `${API_URL}/api/v1/account-requests/bulk/status`;

export default function ListReq() {
  const { auth, isHydrated } = useAuthStore();
  const [listReqAccount, setListReqAccount] = useState<ListReqAccount[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListReqAcc = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_LIST_REQ_ACC, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        setListReqAccount(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      notify.error("Error fetching list of account requests");
      console.error("Error fetching list of account requests:", error);
    }
  };

  const moveToApproved = async (id:string) => {
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
      const response = await axios.put(
        `${PUT_UPDATE_STATUS_REQ_ACC}`,
        {
          ids: ids,
          status: "APPROVED",
          rejectionReason: null,
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
        getListReqAcc();
        notify.success("Status updated successfully");
      }
    } catch (error: any) {
      notify.error("Error updating status of account request");
      console.error("Error updating status of account request:", error);
    }
  };

  // Buat columns dengan callback
  const columns = useMemo(
    () =>
      createColumns({
        onApprove: moveToApproved,
      }),
    []
  );

  useEffect(() => {
    if (isHydrated && auth?.accessToken) {
      getListReqAcc();
    }
  }, [auth, isHydrated]);

  console.log("row selection:", rowSelection);

  return (
    <>
      <ToastContainer />
      <ContainerComponent title="List Request">
        <div className="md:bg-white md:rounded-lg md:p-10">
          <DataTable
            columns={columns}
            data={listReqAccount as ListReqAccount[]}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            moveToApproved={moveToApproved}
            getListReqAcc={getListReqAcc}
          />
        </div>
      </ContainerComponent>
    </>
  );
}

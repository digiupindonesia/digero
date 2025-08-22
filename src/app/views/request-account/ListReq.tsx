import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqAccount/DataTable";
import React, { useEffect, useState } from "react";
import { columns } from "@/components/ReqAccount/columns";
import { ListReqAccount } from "@/types/type";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_LIST_REQ_ACC = `${API_URL}/api/v1/account-requests`;

export default function ListReq() {
  const { auth, isHydrated } = useAuthStore();
  const [listReqAccount, setListReqAccount] = useState<ListReqAccount[]>([]);

  const getListReqAcc = async () => {
    try {
      const response = await axios.get(GET_LIST_REQ_ACC, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setListReqAccount(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching list of account requests:", error);
    }
  };

  useEffect(() => {
    if (isHydrated && auth?.accessToken) {
      getListReqAcc();
    }
  }, [auth, isHydrated]);

  return (
    <ContainerComponent title="List Request">
      <div className="md:bg-white md:rounded-lg md:p-10">
        <DataTable
          columns={columns}
          data={listReqAccount as ListReqAccount[]}
        />
      </div>
    </ContainerComponent>
  );
}

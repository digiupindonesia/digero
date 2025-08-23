import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqTopUp/DataTable";
import React, { useEffect } from "react";
import { columns } from "@/components/ReqTopUp/columns";
import listReqTopUp from "@/assets/data/listReqTopUp";
import { ListReqTopUp } from "@/types/type";
import { notify } from "@/utils/notify";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_LIST_REQ_TOPUP = `${API_URL}/api/v1/payment/my`;

export default function ListReq() {
  const { auth, isHydrated } = useAuthStore();

  const getListTopUp = async () => {
    try {
      const response = await axios.get(GET_LIST_REQ_TOPUP, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Top-up requests fetched successfully:", response.data);
      }
    } catch (error: any) {
      notify.error("Error fetching top-up requests.");
      console.log("Error fetching top-up requests:", error);
    }
  };

  useEffect(() => {
    if (isHydrated && auth) {
      getListTopUp();
    }
  }, [auth, isHydrated]);

  return (
    <ContainerComponent title="List Request">
      <div className="md:bg-white md:rounded-lg md:p-10">
        <DataTable columns={columns} data={listReqTopUp as ListReqTopUp[]} />
      </div>
    </ContainerComponent>
  );
}

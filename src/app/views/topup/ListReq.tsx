import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqTopUp/DataTable";
import React from "react";
import { columns } from "@/components/ReqTopUp/columns";
import listReqTopUp from "@/assets/data/listReqTopUp";
import { ListReqTopUp } from "@/type";

export default function ListReq() {
  return (
    <ContainerComponent title="List Request">
      <div className="md:bg-white md:rounded-lg md:p-10">
        <DataTable
          columns={columns}
          data={listReqTopUp as ListReqTopUp[]}
        />
      </div>
    </ContainerComponent>
  );
}

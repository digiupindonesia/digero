import ContainerComponent from "@/components/ContainerComponent";
import { DataTable } from "@/components/ReqAccount/DataTable";
import React from "react";
import { columns } from "@/components/ReqAccount/columns";
import listReqAccount from "@/assets/data/reqAccount.js";
import { ListReqAccount } from "@/type";

export default function ListReq() {
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

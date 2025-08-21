import React from "react";
import ContainerComponent from "@/components/ContainerComponent";
import ContainerPage from "@/components/ContainerPage";
import { columns } from "../../components/Member/columns";
import { DataTable } from "@/components/Member/DataTable";
import members from "@/assets/data/member.js";
import { Member } from "@/types/type";
import HeaderPage from "@/components/HeaderPage";

export default function Page() {
  return (
    <ContainerPage title="Data Member" isHeader={false}>
      <HeaderPage title="Data Member" />
      <ContainerComponent title="List Data">
        <div className="md:bg-white md:rounded-lg md:p-10">
          <DataTable columns={columns} data={members as Member[]} />
        </div>
      </ContainerComponent>
    </ContainerPage>
  );
}

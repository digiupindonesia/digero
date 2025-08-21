"use client";

import React from "react";
import ContainerComponent from "@/components/ContainerComponent";
import ContainerPage from "@/components/ContainerPage";
import { columns } from "../../components/Member/columns";
import { DataTable } from "@/components/Member/DataTable";
import members from "@/assets/data/member.js";
import { Member } from "@/types/type";
import HeaderPage from "@/components/HeaderPage";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChangePasswordModal } from "@/stores/changePasswordModal";

export default function Page() {
  const { open, openModal, setOpenModal, toggle } = useChangePasswordModal();
  return (
    <>
      <ContainerPage title="Data Member" isHeader={false}>
        <HeaderPage title="Data Member" />
        <ContainerComponent title="List Data">
          <div className="md:bg-white md:rounded-lg md:p-10">
            <DataTable columns={columns} data={members as Member[]} />
          </div>
        </ContainerComponent>
      </ContainerPage>

      <Dialog open={openModal} onOpenChange={(v) => setOpenModal(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

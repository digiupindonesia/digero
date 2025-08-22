"use client";

import React, { useEffect, useState } from "react";
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
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_MEMBERS = `${API_URL}/api/v1/members?role=USER`;

export default function Page() {
  const { open, openModal, setOpenModal, toggle } = useChangePasswordModal();
  const { auth, isHydrated } = useAuthStore();
  const [members, setMembers] = useState<Member[]>([]);

  const getMember = async () => {
    try {
      const response = await axios.get(GET_MEMBERS, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setMembers(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    if (isHydrated) {
      getMember();
    }
  }, [auth, isHydrated]);

  console.log(members);

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

      <Dialog open={openModal} onOpenChange={(v: boolean) => setOpenModal(v)}>
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

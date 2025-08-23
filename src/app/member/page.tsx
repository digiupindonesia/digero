"use client";

import React, { useEffect, useState } from "react";
import ContainerComponent from "@/components/ContainerComponent";
import ContainerPage from "@/components/ContainerPage";
import { columns } from "../../components/Member/columns";
import { DataTable } from "@/components/Member/DataTable";
import { Member } from "@/types/type";
import HeaderPage from "@/components/HeaderPage";
import { FaLock } from "react-icons/fa";

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
import { notify } from "@/utils/notify";
import { ToastContainer } from "react-toastify";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { produce } from "immer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_MEMBERS = `${API_URL}/api/v1/members?role=USER`;
const CHANGE_PASSWORD_PATCH = `${API_URL}/api/v1/admin/users/`;

export default function Page() {
  const { open, openModal, setOpenModal, toggle, data, reset } =
    useChangePasswordModal();
  const { auth, isHydrated } = useAuthStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [newPassword, setNewPassword] = useState<{
    idMember: string;
    newPassword: string;
  }>({
    idMember: data || "",
    newPassword: "",
  });

  const getMember = async () => {
    try {
      const response = await axios.get(`${GET_MEMBERS}`, {
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

  const changePassword = async () => {
    try {
      const response = await axios.patch(
        `${CHANGE_PASSWORD_PATCH}${data}/password`,
        {
          newPassword: newPassword.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        reset();
        notify.success("Password changed successfully");
      }
    } catch (error: any) {
      console.error("Error updating pass:", error);
    }
  };

  useEffect(() => {
    if (isHydrated) {
      getMember();
    }
  }, [auth, isHydrated]);

  return (
    <>
      <ToastContainer />
      <ContainerPage title="Data Member" isHeader={false}>
        <HeaderPage title="Data Member" />
        <ContainerComponent title="List Data">
          <div className="md:bg-white md:rounded-lg md:p-10">
            <DataTable
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              columns={columns}
              data={members as Member[]}
            />
          </div>
        </ContainerComponent>
      </ContainerPage>

      <Dialog open={openModal} onOpenChange={(v: boolean) => setOpenModal(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ganti Password?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-col gap-2 items-end">
            <Input
              Icon={FaLock}
              placeholder="New Password"
              className="my-1"
              value={newPassword.newPassword}
              onChange={(e) =>
                setNewPassword(
                  produce(newPassword, (draft) => {
                    draft.newPassword = e.target.value;
                  })
                )
              }
            />

            <Button
              onClick={() => changePassword()}
              className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

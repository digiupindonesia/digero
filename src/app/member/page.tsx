"use client";

import React, { useEffect, useMemo, useState } from "react";
import ContainerComponent from "@/components/ContainerComponent";
import ContainerPage from "@/components/ContainerPage";
import { columns } from "../../components/Member/columns";
import { DataTable } from "@/components/Member/DataTable";
import { Member } from "@/types/type";
import HeaderPage from "@/components/HeaderPage";
import { FaLock } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOpenModal } from "@/stores/openModal";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { notify } from "@/utils/notify";
import { ToastContainer } from "react-toastify";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { produce } from "immer";
import strengthText from "@/utils/strengthText";
import strengthColor from "@/utils/strengthColor";
import calcStrength from "@/utils/calcStrength";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_MEMBERS = `${API_URL}/api/v1/members?role=USER`;
const CHANGE_PASSWORD_PATCH = `${API_URL}/api/v1/admin/users/`;
const CHANGE_FEE_PATCH = `${API_URL}/api/v1/admin/users/bulk/fee`;
const SUSPEND_MEMBER_PATCH = `${API_URL}/api/v1/admin/users/bulk/suspend`;

export default function Page() {
  const {
    changePasswordModal,
    feeModal,
    suspendModal,
    setOpenModal,
    data,
    reset,
  } = useOpenModal();
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

  const [newFee, setNewFee] = useState<{
    idMember: string;
    newFee: number;
  }>({
    idMember: data || "",
    newFee: 0,
  });

  const strength = useMemo(
    () => calcStrength(newPassword.newPassword),
    [newPassword.newPassword]
  );

  const getMemberEmailByID = (id: string | undefined) => {
    const member = members.find((member) => member.id === id);
    return member ? member.email : "";
  };

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
      notify.error("Error fetching members");
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
        setRowSelection({});
        notify.success("Password changed successfully");
      }
    } catch (error: any) {
      notify.error("Error updating password");
      console.error("Error updating pass:", error);
    }
  };

  const changeFee = async () => {
    const idsArray = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );

    // Prioritaskan data dari useOpenModal, jika tidak ada gunakan idsArray
    const ids = data ? [data] : idsArray;

    try {
      const response = await axios.patch(
        `${CHANGE_FEE_PATCH}`,
        {
          ids: ids,
          feePercent: newFee.newFee,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        reset();
        setRowSelection({});
        getMember();
        notify.success("Fee changed successfully");
      }
    } catch (error: any) {
      notify.error("Error updating fee");
      console.error("Error updating fee:", error);
    }
  };

  const suspendMember = async () => {
    const idsArray = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );

    // Prioritaskan data dari useOpenModal, jika tidak ada gunakan idsArray
    const ids = data ? [data] : idsArray;

    try {
      const response = await axios.patch(
        `${SUSPEND_MEMBER_PATCH}`,
        {
          ids: ids,
          suspend: true,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        reset();
        setRowSelection({});
        getMember();
        notify.success("Member suspended successfully");
      }
    } catch (error: any) {
      notify.error("Error suspending member");
      console.error("Error suspending member:", error);
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

      <Dialog
        open={changePasswordModal}
        onOpenChange={(v: boolean) => setOpenModal("changePasswordModal", v)}
      >
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
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black font-light">
                  Password Strength
                </span>
                <span className="text-sm text-zinc-400">
                  {strengthText(strength)}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className={`h-full ${strengthColor(
                    strength
                  )} transition-all duration-300`}
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>

            <Button
              disabled={strength < 80}
              onClick={() => changePassword()}
              className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={feeModal}
        onOpenChange={(v: boolean) => setOpenModal("feeModal", v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Fee {getMemberEmailByID(data)}?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {Object.keys(rowSelection).length > 0 || data !== undefined ? (
            <div className="w-full flex flex-col gap-2 items-end">
              <Input
                type="text"
                Icon={RiDiscountPercentLine}
                placeholder="New Fee"
                className="my-1"
                inputMode="decimal"
                pattern="[0-9]*\.?[0-9]*"
                value={newFee.newFee.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[0-9]*\.?[0-9]*$/.test(val) || val === "") {
                    setNewFee((prev) => ({
                      ...prev,
                      newFee: val === "" ? 0 : Number(val),
                    }));
                  }
                }}
                onBlur={() => {
                  setNewFee(
                    produce(newFee, (draft) => {
                      draft.newFee = Number(draft.newFee);
                    })
                  );
                }}
              />

              <Button
                onClick={() => changeFee()}
                className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded"
              >
                Save
              </Button>
            </div>
          ) : (
            <p>Centang member terlebih dahulu pada kolom paling kiri</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={suspendModal}
        onOpenChange={(v: boolean) => setOpenModal("suspendModal", v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend {getMemberEmailByID(data)}?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {Object.keys(rowSelection).length > 0 || data !== undefined ? (
            <>
              {Object.keys(rowSelection)
                .filter((key) => rowSelection[key])
                .map((id) => {
                  const member = members.find((m) => m.id === id);
                  return member ? <p key={id}>{member.email}</p> : null;
                })}
              <Button
                onClick={() => suspendMember()}
                className="flex items-center gap-2 bg-red-500 w-fit text-white p-2 rounded"
              >
                Suspend
              </Button>
            </>
          ) : (
            <p>Centang member terlebih dahulu pada kolom paling kiri {data}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

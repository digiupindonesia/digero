import ContainerComponent from "@/components/ContainerComponent";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useReqAccStore } from "@/stores/reqAcc";
import { notify } from "@/utils/notify";
import axios from "axios";
import React, { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoBagAddOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REQ_ACC_POST = `${API_URL}/api/v1/account-requests`;

type FormReqProps = {
  page: string;
  setPage: (page: string) => void;
};

export default function FormReq({ page, setPage }: FormReqProps) {
  const { auth } = useAuthStore();
  const { form, updateForm, isFormValid } = useReqAccStore();
  const [isLoading, setIsLoading] = useState(false);

  const submitReqAcc = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(REQ_ACC_POST, form, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setIsLoading(false);
        notify.success("Request akun berhasil diajukan");
        setPage("thank-you");
        console.log("Request successful:", response.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      notify.error(
        `Gagal mengajukan request akun: ${error?.response?.data?.message || ""}`
      );
      console.error("Error submitting request:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <ContainerComponent title="Form Request">
        <div className="md:bg-white md:rounded-lg md:py-20">
          <div className="flex flex-col gap-10 mx-auto max-w-md">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-base font-normal">Nama Akun</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                <Input
                  Icon={FaRegAddressCard}
                  className="w-full my-1"
                  placeholder="Nama Akun"
                  value={form.accountName}
                  onChange={(e) => updateForm("accountName", e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-base font-normal">ID Business Center</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                <Input
                  Icon={HiOutlineBadgeCheck}
                  className="w-full my-1"
                  placeholder="ID Business Center"
                  value={form.businessCenterId}
                  onChange={(e) =>
                    updateForm("businessCenterId", e.target.value)
                  }
                />
              </div>
            </div>
            <Button
              disabled={!isFormValid() || isLoading}
              onClick={submitReqAcc}
              className="flex items-center gap-2 bg-black w-full py-5 text-white text-base rounded"
            >
              <IoBagAddOutline />
              Request Akun
            </Button>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}

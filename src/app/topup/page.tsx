"use client";

import ContainerPage from "@/components/ContainerPage";
import React, { useState } from "react";
import FormOrder from "../views/topup/FormTopup";
import ThankYou from "../views/topup/ThankYou";
import ListReq from "../views/topup/ListReq";
import HeaderPage from "@/components/HeaderPage";
import { useAuthStore } from "@/stores/useAuthStore";
import { TopUp } from "@/types/type";

export default function Page() {
  const { auth } = useAuthStore();
  const [page, setPage] = useState("form");
  const [dataSuccessTopUp, setDataSuccessTopUp] = useState<TopUp>({
    id: "",
    userId: "",
    accountRequestId: "",
    amount: 0,
    feePercent: 0,
    feeAmount: 0,
    uniqueCode: 0,
    subtotal: 0,
    total: 0,
    paymentMethod: "BCA", // Replace "TRANSFER" with a valid PaymentMethod value from your type definition
    status: "PENDING",
    paidAt: null,
    expiredAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accountRequest: {
      id: "",
      accountName: "",
      businessCenterId: "",
      status: "PENDING",
    },
    user: {
      id: "",
      username: "",
      firstName: null,
      lastName: null,
    },
  });

  return (
    <ContainerPage title="Order Topup" isHeader={false}>
      <HeaderPage title="Order Topup" isButton={false} />
      {auth?.user.role === "ADMIN" && <ListReq />}
      {auth?.user.role === "USER" && (
        <>
          {page === "form" && <FormOrder page={page} setPage={setPage} successTopUp={setDataSuccessTopUp} />}
          {page === "thank-you" && <ThankYou data={dataSuccessTopUp} />}
        </>
      )}
    </ContainerPage>
  );
}

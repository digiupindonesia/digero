"use client";

import ContainerPage from "@/components/ContainerPage";
import React, { useState } from "react";
import FormOrder from "../views/topup/FormTopup";
import ThankYou from "../views/topup/ThankYou";
import ListReq from "../views/topup/ListReq";
import HeaderPage from "@/components/HeaderPage";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Page() {
  const { auth } = useAuthStore();
  const [page, setPage] = useState("form");

  return (
    <ContainerPage title="Order Topup" isHeader={false}>
      <HeaderPage title="Order Topup" isButton={false} />
      {auth?.user.role === "ADMIN" && <ListReq />}
      {auth?.user.role === "USER" && (
        <>
          {page === "form" && <FormOrder page={page} setPage={setPage} />}
          {page === "thank-you" && <ThankYou />}
        </>
      )}
    </ContainerPage>
  );
}

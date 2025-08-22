"use client";

import ContainerPage from "@/components/ContainerPage";
import React, { useState } from "react";
import FormReq from "../views/request-account/FormReq";
import ThankYou from "../views/request-account/ThankYou";
import ListReq from "../views/request-account/ListReq";
import HeaderPage from "@/components/HeaderPage";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Page() {
  const { auth } = useAuthStore();
  const [page, setPage] = useState("form");

  return (
    <ContainerPage title="Request Akun" isHeader={false}>
      <HeaderPage title="Request Akun" />
      {auth?.user.role === "ADMIN" && <ListReq />}
      {auth?.user.role === "USER" && (
        <>
          {page === "form" && <FormReq page={page} setPage={setPage} />}
          {page === "thank-you" && <ThankYou />}
        </>
      )}
    </ContainerPage>
  );
}

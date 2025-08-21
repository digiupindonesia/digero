"use client";

import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormReq from "../views/request-account/FormReq";
import ThankYou from "../views/request-account/ThankYou";
import ListReq from "../views/request-account/ListReq";
import HeaderPage from "@/components/HeaderPage";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Page() {
  const { auth } = useAuthStore();

  return (
    <ContainerPage title="Request Akun" isHeader={false}>
      <HeaderPage title="Request Akun" />
      {auth?.user.role === "ADMIN" && <ListReq />}
      <FormReq />
      <ThankYou />
    </ContainerPage>
  );
}

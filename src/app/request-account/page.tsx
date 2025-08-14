import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormReq from "../views/request-account/FormReq";
import ThankYou from "../views/request-account/ThankYou";
import ListReq from "../views/request-account/ListReq";
import HeaderPage from "@/components/HeaderPage";

export default function Page() {
  return (
    <ContainerPage title="Request Akun" isHeader={false}>
      <HeaderPage title="Request Akun" />
      <ListReq />
      <FormReq />
      <ThankYou />
    </ContainerPage>
  );
}

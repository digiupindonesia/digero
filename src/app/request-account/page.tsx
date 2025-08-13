import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormReq from "../views/request-account/FormReq";
import ThankYou from "../views/request-account/ThankYou";
import ListReq from "../views/request-account/ListReq";

export default function Page() {
  return (
    <ContainerPage title="Request Akun">
      <ListReq/>
      <FormReq />
      <ThankYou />
    </ContainerPage>
  );
}

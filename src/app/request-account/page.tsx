import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormReq from "../views/request-account/FormReq";
import ThankYou from "../views/request-account/ThankYou";

export default function Page() {
  return (
    <ContainerPage title="Request Akun">
      <FormReq />
      <ThankYou />
    </ContainerPage>
  );
}

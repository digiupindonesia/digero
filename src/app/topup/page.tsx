import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormOrder from "../views/topup/FormOrder";
import ThankYou from "../views/topup/ThankYou";

export default function Page() {
  return (
    <ContainerPage title="Order Topup">
      <FormOrder />
      <ThankYou/>
    </ContainerPage>
  );
}

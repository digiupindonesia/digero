import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormOrder from "../views/topup/FormOrder";
import ThankYou from "../views/topup/ThankYou";
import ListReq from "../views/topup/ListReq";

export default function Page() {
  return (
    <ContainerPage title="Order Topup">
      <ListReq />
      <FormOrder />
      <ThankYou />
    </ContainerPage>
  );
}

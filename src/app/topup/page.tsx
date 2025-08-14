import ContainerPage from "@/components/ContainerPage";
import React from "react";
import FormOrder from "../views/topup/FormOrder";
import ThankYou from "../views/topup/ThankYou";
import ListReq from "../views/topup/ListReq";
import HeaderPage from "@/components/HeaderPage";

export default function Page() {
  return (
    <ContainerPage title="Order Topup" isHeader={false}>
      <HeaderPage title="Order Topup" isButton={false} />
      <ListReq />
      <FormOrder />
      <ThankYou />
    </ContainerPage>
  );
}

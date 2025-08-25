import ContainerComponent from "@/components/ContainerComponent";
import Image from "next/image";
import React from "react";
import IconMandiri from "@/assets/img/mandiri.png";
import IconBCA from "@/assets/img/bca.png";
import { TopUp } from "@/types/type";
import { useAuthStore } from "@/stores/useAuthStore";
import formatCurrency from "@/utils/formatCurrency";
import Link from "next/link";

const dataPaymentMethod = {
  BCA: {
    icon: IconBCA,
    name: "Bank Central Asia",
    username: "Agung Prasetyo",
    number: "1234567890",
  },
  MANDIRI: {
    icon: IconMandiri,
    name: "Bank Mandiri",
    username: "Agung Prasetyo",
    number: "0987654321",
  },
};

type ThankYouProps = {
  data: TopUp;
};

const CS_NUMBER = process.env.NEXT_PUBLIC_CS_NUMBER;

export default function ThankYou({ data }: ThankYouProps) {
  const { auth } = useAuthStore();
  return (
    <ContainerComponent title="Thank You">
      <div className="md:bg-white md:rounded-lg py-10 md:py-20">
        <div className="max-w-2xl w-full mx-auto px-6 text-center">
          {/* Judul */}
          <h1 className="text-3xl md:text-4xl font-semibold">Terimakasih</h1>

          <div className="mt-10 space-y-12">
            {/* Pembuka */}
            <p className="text-lg leading-relaxed">
              Terimakasih {auth?.user.username} sudah melakukan order topup
              dengan detail
            </p>

            {/* Detail nominal & akun */}
            <div className="space-y-1 text-lg">
              <p>
                Nominal Total + Fee:{" "}
                <span className="font-bold">{formatCurrency(data.total)}</span>
              </p>
              <p>
                Akun:{" "}
                <span className="font-medium">
                  {data.accountRequest.accountName}
                </span>
              </p>
            </div>

            {/* Instruksi bayar */}
            <p className="text-lg leading-relaxed">
              Silahkan lakukan pembayaran ke nomor rekening berikut
            </p>

            {/* Logo + nomor rekening */}
            <div className="space-y-3">
              <div className="flex flex-col items-center gap-3">
                <Image
                  alt="Bank Logo"
                  src={dataPaymentMethod[data.paymentMethod].icon}
                  className="mx-auto"
                />
                <p className="text-xl font-semibold tracking-wide">
                  {dataPaymentMethod[data.paymentMethod].number}{" "}
                  <span className="font-normal">
                    — {dataPaymentMethod[data.paymentMethod].username}
                  </span>
                </p>
              </div>

              {/* Catatan akhir */}
              <p className="text-lg leading-relaxed">
                Bila sudah melakukan pembayaran silahkan tunggu atau untuk
                proses lebih cepat bisa hub cs kami dengan klik{" "}
                <Link
                  href={`https://wa.me/${CS_NUMBER}`}
                  target="_blank"
                  className="text-yellow-500 underline"
                >
                  disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

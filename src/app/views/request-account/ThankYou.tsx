import ContainerComponent from "@/components/ContainerComponent";
import { useReqAccStore } from "@/stores/reqAcc";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";

const CS_NUMBER = process.env.NEXT_PUBLIC_CS_NUMBER;

export default function ThankYou() {
  const { form } = useReqAccStore();
  const { auth } = useAuthStore();

  return (
    <>
      <ToastContainer />
      <ContainerComponent title="Thank You">
        <div className="md:bg-white md:rounded-lg py-10 md:py-20">
          <div className="max-w-2xl w-full mx-auto px-6 text-center">
            {/* Judul */}
            <h1 className="text-3xl md:text-4xl font-semibold">Terimakasih</h1>

            {/* Isi, dibikin berjarak antar blok */}
            <div className="mt-10 space-y-12">
              <p className="text-lg leading-relaxed">
                Terimakasih {auth?.user?.username} sudah melakukan Request Akun
                dengan detail
              </p>

              <div className="space-y-1 text-lg">
                <p>
                  Nama Akun:{" "}
                  <span className="font-medium">{form.accountName}</span>
                </p>
                <p>
                  ID Business Center:{" "}
                  <span className="font-medium">{form.businessCenterId}</span>
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                Kami akan proses dengan segera, silahkan tunggu. Untuk proses
                lebih cepat, hubungi CS kami dengan klik{" "}
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
      </ContainerComponent>
    </>
  );
}

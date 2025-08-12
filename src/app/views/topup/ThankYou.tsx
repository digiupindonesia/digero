import ContainerComponent from "@/components/ContainerComponent";
import Image from "next/image";
import React from "react";
import IconMandiri from "@/assets/img/mandiri.png";

export default function ThankYou() {
  return (
    <ContainerComponent title="Thank You">
      <div className="md:bg-white md:rounded-lg py-10 md:py-20">
        <div className="max-w-2xl w-full mx-auto px-6 text-center">
          {/* Judul */}
          <h1 className="text-3xl md:text-4xl font-semibold">Terimakasih</h1>

          <div className="mt-10 space-y-12">
            {/* Pembuka */}
            <p className="text-lg leading-relaxed">
              Terimakasih (username) sudah melakukan order topup dengan detail
            </p>

            {/* Detail nominal & akun */}
            <div className="space-y-1 text-lg">
              <p>
                Nominal Total + Fee:{" "}
                <span className="font-medium">(nominal)</span>
              </p>
              <p>
                Akun: <span className="font-medium">(akun)</span>
              </p>
            </div>

            {/* Instruksi bayar */}
            <p className="text-lg leading-relaxed">
              Silahkan lakukan pembayaran ke nomor rekening berikut
            </p>

            {/* Logo + nomor rekening */}
            <div className="space-y-3">
              <Image alt="Bank Logo" src={IconMandiri} className="mx-auto" />
              <p className="text-xl font-semibold tracking-wide">
                62332242342{" "}
                <span className="font-normal">— Agung Prasetyo</span>
              </p>
            </div>

            {/* Catatan akhir */}
            <p className="text-lg leading-relaxed">
              Bila sudah melakukan pembayaran silahkan tunggu atau untuk proses
              lebih cepat bisa hub cs kami dengan klik{" "}
              <a href="/kontak" className="text-yellow-500 underline">
                disini
              </a>
            </p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

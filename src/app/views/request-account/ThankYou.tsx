import ContainerComponent from "@/components/ContainerComponent";
import React from "react";

export default function ThankYou() {
  return (
    <ContainerComponent title="Thank You">
      <div className="md:bg-white md:rounded-lg py-10 md:py-20">
        <div className="max-w-2xl w-full mx-auto px-6 text-center">
          {/* Judul */}
          <h1 className="text-3xl md:text-4xl font-semibold">Terimakasih</h1>

          {/* Isi, dibikin berjarak antar blok */}
          <div className="mt-10 space-y-12">
            <p className="text-lg leading-relaxed">
              Terimakasih (username) sudah melakukan order topup dengan detail
            </p>

            <div className="space-y-1 text-lg">
              <p>
                Nama Akun: <span className="font-medium">(akun)</span>
              </p>
              <p>
                ID Business Center: <span className="font-medium">(idbc)</span>
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              Kami akan proses dengan segera, silahkan tunggu. Untuk proses
              lebih cepat, hubungi CS kami dengan klik{" "}
              <a href="/kontak" className="text-yellow-500 underline">
                disini
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

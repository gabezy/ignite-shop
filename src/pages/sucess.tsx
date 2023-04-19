import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Sucess() {
  return (
    <div className="flex flex-col justify-center items-center max-w-custom min-h-[570px] mx-auto text-center">
      <Head>
        <title>Checkout</title>
      </Head>
      <h1 className="text-3xl text-gray100 font-bold mt-10 mb-16">
        Compra efetuada com sucesso!
      </h1>
      <div className="w-[200px] h-[229px] bg-gradient-radial rounded-lg mb-8"></div>
      <p className="text-gray300 text-2xl max-w-[40ch]">
        Uhuul <strong>Gabriel Moreira</strong>! Sua{" "}
        <strong>Camiseta Beyond the limits</strong> já está a caminho da sua
        casa.
      </p>
      <Link
        href={"/"}
        className="text-green500 text-xl font-bold mt-auto p-2 hover:text-green300"
      >
        Voltar ao catálogo
      </Link>
    </div>
  );
}

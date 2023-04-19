import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

interface CheckoutProps {
  customerName: string;
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Sucess({customerName, product}: CheckoutProps) {
  return (
    <div className="flex flex-col justify-center items-center max-w-custom min-h-[570px] mx-auto text-center">
      <Head>
        <title>Checkout</title>
      </Head>
      <h1 className="text-4xl text-gray100 font-bold mt-10 mb-16">
        Compra efetuada!
      </h1>
      <div className="flex justify-center items-center w-[127px] h-[145px] bg-gradient-radial rounded-lg mb-8">
        <Image className="object-cover" src={product.imageUrl} alt="" width={115} height={106} />
      </div>
      <p className="text-gray300 text-2xl max-w-[40ch]">
        Uhuul <strong>{customerName}</strong>! Sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua
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

//cs_test_a1W6uyin7zh1oo9VpQ1WfsgyV9FaZSfeBwGuuPKcKsQrGP4yszzNYotdy9

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;
  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    },
  };
};

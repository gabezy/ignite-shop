import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

interface CheckoutProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Sucess({ customerName, products }: CheckoutProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex flex-col justify-center items-center max-w-custom min-h-[570px] mx-auto text-center">
        <h1 className="text-4xl text-gray100 font-bold mt-10 mb-16">
          Compra efetuada!
        </h1>
        <div className="flex">
          {products.map((product) => {
            return (
              <div
                key={product.name}
                className="flex justify-center items-center w-[140px] h-[140px] bg-gradient-radial rounded-full mb-8"
              >
                <Image
                  className="object-cover"
                  src={product.imageUrl}
                  alt=""
                  width={130}
                  height={132}
                />
              </div>
            );
          })}
        </div>
        <p className="text-gray300 text-2xl max-w-[40ch] mb-16">
          Uhuul <strong>{customerName}</strong>! Sua compra de {products.length}{" "}
          camisetas já está a caminho da sua casa.
        </p>
        <Link
          href={"/"}
          className="text-green500 text-xl font-bold p-2 hover:text-green300"
        >
          Voltar ao catálogo
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const customerName = session.customer_details?.name;
  const productsData = session.line_items?.data;
  if (productsData) {
    const products = productsData.map((data) => {
      const product = data.price?.product as Stripe.Product;
      return {
        name: product.name,
        imageUrl: product.images[0],
      };
    });
    return {
      props: {
        customerName,
        products,
      },
    };
  }
  throw new Error();
};

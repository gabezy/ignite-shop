import Image from "next/image";
import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import axios from "axios";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  //const router = useRouter(); internal url

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl; // external url
      // router.push("/checkout") send to internal url
    } catch (err) {
      // connect to a observer tool (Datadog/ Sentry)
      alert("Falha ao redirecionar ao checkout!");
      setIsCreatingCheckoutSession(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <div className="grid grid-cols-2 items-stretch gap-[72px] justify-center max-w-custom mx-auto">
        <div className="flex items-center justify-center bg-gradient-radial rounded-lg w-[576px] h-[calc(656px-0.5rem)]">
          <Image
            src={product.imageUrl}
            blurDataURL={product.imageUrl}
            placeholder="blur"
            width={520}
            height={480}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-gray300 text-4xl font-bold mb-4">
            {product.name}
          </h1>
          <span className="text-green500 text-4xl mb-10">{product.price}</span>
          <p className="text-gray100 text-lg">{product.description}</p>
          <button
            className="mt-auto border-0 bg-green500 text-center py-5 rounded-lg text-white text-lg font-bold cursor-pointer not:hover:bg-green300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await stripe.products.list();

  const ids = products.data
    .map((product) => {
      return {
        params: {
          id: product.id,
        },
      };
    })
    .slice(0, 1);

  return {
    paths: ids,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  if (productId == undefined) {
    throw new Error();
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        defaultPriceId: price.id,
        price:
          price.unit_amount != null
            ? new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(price.unit_amount / 100)
            : 0,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};

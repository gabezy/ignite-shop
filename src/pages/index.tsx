import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import SkeletonLoadingHome from "@/components/SkeletonLoadingHome";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { isFallback } = useRouter();
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });
  return (
    <>
      <Head>
        <title>Ignite Shop | Home</title>
      </Head>
      <div
        ref={sliderRef}
        className="flex w-full max-w-[calc(100vw-((100vw-1180px)/2))] ml-auto min-h-homeCard keen-slider overflow-hidden"
      >
        {isFallback && (
          <div className="flex gap-4">
            {Array(3)
              .fill(1)
              .map((_, i) => (
                <SkeletonLoadingHome key={i} />
              ))}
          </div>
        )}
        {!isFallback &&
          products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="relative"
                prefetch={false}
              >
                <div className="bg-gradient-radial rounded-lg p-1 cursor-pointer relative flex items-center justify-center w-[690px] h-[656px] group overflow-hidden keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    blurDataURL={product.imageUrl}
                    placeholder="blur"
                    width={520}
                    height={480}
                    alt=""
                    className="object-cover"
                  />
                  <footer className="absolute bottom-1 left-1 right-1 rounded-md flex p-8 items-center justify-between bg-customBlack  translate-y-1/4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-col gap-2">
                      <strong className="text-xl text-white">
                        {product.name}
                      </strong>
                      <span className="text-2xl font-bold text-green300">
                        {product.price}
                      </span>
                    </div>
                    <button className="flex items-center justify-center bg-green500 p-3 rounded-lg hover:bg-green300 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </button>
                  </footer>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price:
        price.unit_amount != null
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price.unit_amount / 100)
          : 0,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

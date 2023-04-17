import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <div
      ref={sliderRef}
      className="flex  w-full max-w-[calc(100vw-((100vw-1180px)/2))] ml-auto min-h-homeCard keen-slider"
    >
      {products.map((product) => {
        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div
              className="bg-gradient-radial rounded-lg p-1 cursor-pointer relative flex items-center justify-center w-[690px] h-[656px] group overflow-hidden keen-slider__slide"
            >
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
                <strong className="text-xl text-white">{product.name}</strong>
                <span className="text-2xl font-bold text-green300">
                  {product.price}
                </span>
              </footer>
            </div>
          </Link>
        );
      })}
    </div>
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

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";
import MyPopover from "@/components/popover";
import { ProductProvider } from "@/context/products-context";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ProductProvider>
      <div className="flex flex-col items-start min-h-screen justify-center">
        {pathname.includes("sucess") && (
          <header className="flex justify-center w-full max-w-custom mx-auto mb-8">
            <Link href="/">
              <Image
                src={logo}
                width={logo.width}
                height={logo.height}
                alt=""
              />
            </Link>
          </header>
        )}
        {!pathname.includes("sucess") && (
          <header className="flex justify-between w-full max-w-custom mx-auto mb-8">
            <Link href="/">
              <Image
                src={logo}
                width={logo.width}
                height={logo.height}
                alt=""
              />
            </Link>
            <MyPopover />
          </header>
        )}
        <Component {...pageProps} />
      </div>
    </ProductProvider>
  );
}

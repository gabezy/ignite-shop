import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-start min-h-screen justify-center">
      <header className="py-8 w-full max-w-custom mx-auto">
        <Link href="/" onClick={() => console.log("dsfadas")}>
          <Image src={logo} width={logo.width} height={logo.height} alt="" />
        </Link>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

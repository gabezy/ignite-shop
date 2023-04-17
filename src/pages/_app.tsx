import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image"
import logo from "../assets/logo.svg"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col items-start min-h-screen justify-center'>
      <header className='py-8 w-full max-w-custom mx-auto'>
        <Image src={logo} width={logo.width} height={logo.height} alt='' />
      </header>
      <Component {...pageProps} />
    </div>
  )
}

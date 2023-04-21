import React, { useContext, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { ProductContext } from "@/context/products-context";
import axios from "axios";

interface SummaryProps {
  total: number;
  totalFormatted: string;
}

export default function MyPopover() {
  const { products, removeProduct, summary } = useContext(ProductContext);

  const [productsSummary, setProductsSummary] = useState({} as SummaryProps);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleFinishShopping = async () => {
    try {
      setIsCreatingCheckoutSession(true);
      const priceIds = products.map((product) => product.priceId);
      const response = await axios.post("/api/checkout", {
        priceIds,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Error ao realizar o checkout, por favor tentar mais tarde!");
      setIsCreatingCheckoutSession(false);
    }
  };

  React.useEffect(() => {
    const total = summary(products);
    const totalFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
    setProductsSummary({ total, totalFormatted });
  }, [products, summary]);

  const handleRemoveItem = (productId: string) => {
    removeProduct(productId);
  };

  return (
    <Popover className="">
      <Popover.Button
        className="disabled:cursor-not-allowed"
        disabled={products.length <= 0}
        title="Sacola"
      >
        <div className="flex items-center justify-center p-3 rounded-lg bg-grayIcon group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray300 group-hover:text-gray100 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          {products.length > 0 && (
            <div className="w-[24px] h-[24px] text-white text-sm font-bold rounded-full bg-green300 box-content border-4 border-[#121214] absolute top-[-12px] right-[-12px] flex justify-center items-center">
              {products.length}
            </div>
          )}
        </div>
      </Popover.Button>
      <Transition
        className="fixed right-0 top-0 z-10 w-[480px] h-screen"
        enter="transition duration-100 ease-out"
        enterFrom="transform translate-x-[-50px] opacity-0"
        enterTo="transform translate-x-0 opacity-1"
        leave="transition duration-100 ease-out"
        leaveFrom="transform translate-x-0 opacity-1"
        leaveTo="transform translate-x-[-50px] opacity-0"
      >
        <Popover.Panel className="fixed right-0 top-0 z-10 w-[480px] h-screen bg-grayIcon">
          <div className="flex flex-col pt-20 pb-12 px-12 h-full">
            <h2 className="text-xl text-gray100 font-bold mb-8">
              Sacola de compras
            </h2>
            <div className="flex flex-col gap-6">
              {products.map((product) => {
                return (
                  <div key={product.id} className="flex gap-5">
                    <div className="flex justify-center items-center bg-gradient-radial rounded-lg">
                      <Image
                        src={product.imageUrl}
                        width={94}
                        height={94}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-lg text-gray300">{product.name}</h3>
                      <span className="text-lg text-gray100 font-bold mb-2">
                        {product.price}
                      </span>
                      <button
                        className="text-base font-bold text-green500 hover:text-green300 text-center p-1"
                        type="button"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="justify-self-end flex flex-col mt-auto">
              <p className="flex justify-between items-center text-base text-gray300 mb-2">
                Quantidade
                <span className="text-lg">{products.length} items</span>
              </p>
              <h2 className="flex justify-between items-center text-lg text-gray100 font-bold mb-14">
                Valor total
                <span className="text-2xl font-bold">
                  {productsSummary.totalFormatted}
                </span>
              </h2>
              <button
                className="text-gray100 text-lg p-5 bg-green300 hover:bg-green500 transition-colors rounded-lg"
                type="button"
                onClick={handleFinishShopping}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

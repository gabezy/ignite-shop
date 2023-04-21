import { ProductProps } from "@/pages/product/[id]";
import React, { ReactNode, useState } from "react";

interface ContextProps {
  products: Product[];
  addNewProduct: (product: ProductProps) => void;
  removeProduct: (productId: string) => void;
  summary: (products: Product[]) => number;
}

export const ProductContext = React.createContext({} as ContextProps);

interface ProviderProps {
  children: ReactNode;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  priceId: string;
}

export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState([] as Product[]);

  const addNewProduct = (product: ProductProps) => {
    const newProduct: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      priceId: product.defaultPriceId,
    };
    setProducts((state) => [...state, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setProducts((state) => {
      return state.filter((s) => s.id !== productId);
    });
  };

  const summary = (products: Product[]): number => {
    if (products.length <= 0) {
      return 0;
    }
    return products.reduce((acc, product) => {
      const price = Number.parseFloat(product.price.replace(/[^\d,-]/g, '').replace(',', '.'));
      return acc + price;
    }, 0)
  }

  return (
    <ProductContext.Provider value={{ products, addNewProduct, removeProduct, summary }}>
      {children}
    </ProductContext.Provider>
  );
};

"use client"
import { createContext, ReactNode, useContext, useState } from 'react'

export const product = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description:"This product is very good"
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description:"This product is very good"
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    description:"This product is very good"
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    description:"This product is very good"
  },
  {
    id: 5,
    name: "Product 5",
    price: 500,
    description:"This product is very good"
  },
  {
    id: 6,
    name: "Product 6",
    price: 600,
    description:"This product is very good"
  },
  {
    id: 7,
    name: "Product 7",
    price: 700,
    description:"This product is very good"
  },
  {
    id: 8,
    name: "Product 8",
    price: 800,
    description:"This product is very good"
  },
  {
    id: 9,
    name: "Product 9",
    price: 900,
    description:"This product is very good"
  },
  {
    id: 10,
    name: "Product 10",
    price: 1000,
    description:"This product is very good"
  },
  {
    id: 11,
    name: "Product 11",
    price: 1100,
    description:"This product is very good"
  },
  {
    id: 12,
    name: "Product 12",
    price: 1200,
    description:"This product is very good"
  },
  {
    id: 13,
    name: "Product 13",
    price: 1300,
    description:"This product is very good"
  },
  {
    id: 14,
    name: "Product 14",
    price: 1400,
    description:"This product is very good"
  },
  {
    id: 15,
    name: "Product 15",
    price: 1500,
    description:"This product is very good"
  },
  {
    id: 16,
    name: "Product 16",
    price: 1600,
    description:"This product is very good"
  },
  {
    id: 17,
    name: "Product 17",
    price: 1700,
    description:"This product is very good"
  },
  {
    id: 18,
    name: "Product 18",
    price: 1800,
    description:"This product is very good"
  },
  {
    id: 19,
    name: "Product 19",
    price: 1900,
    description:"This product is very' good"
  }
];


interface LojaProviderProps {
  children: ReactNode;
}

interface CarrinhoProduto {
  id: number;
  quantity: number;
  price: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  stock: number;
  brand: string;
}

interface LojaDataProps {
  product: Product[];
  cart: CarrinhoProduto[];
  handleAddToCart: (id: number, quantity: number, price: number) => void;
  handleAddProduct: (id: number) => void;
  handleRemoveProduct: (id: number) => void;
}

const lojaContext = createContext({} as LojaDataProps)

export const LojaProvider = ({ children }: LojaProviderProps) => {
  // const [product, setProduct] = useState<Product[]>([])
  const [cart, setCart] = useState<CarrinhoProduto[]>([]);
  function handleAddProduct() {
    setCart(
      cart.map((i)=> 
      i.id === i.id ? {...i, quantity: i.quantity + 1} : i)
    );
  }

  function handleRemoveProduct(id: number) {
    const product = cart.find((i) => i.id === id);

   if(product){
      if(product.quantity >= 1){
        setCart(
          cart.map((i)=> 
          i.id === i.id ? {...i, quantity: i.quantity - 1} : i)
        );
      }
   }
  } 

  function handleAddToCart(id: number, quantity: number, price: number) {
    const product = cart.find((i) => i.id === id);
    console.log(cart)
    if(!product){
      setCart([...cart, {id, quantity, price}]);
    }else {
        
      setCart(
        cart.map((i) => i.id === id ? {...i, quantity: i.quantity + 1} : i)
      )
    }
  }

  // async function getProducts() {
  //   const response = await fetch("http://localhost:3333/products");
  //   const data = await response.json();
  //   setProduct(data);
  // }




  return (
    <lojaContext.Provider
    value={{
      product,
      cart,
      handleAddToCart,
      handleAddProduct,
      handleRemoveProduct,
    }}
    >
      {children}
    </lojaContext.Provider>
  )
}

export const useLoja = () => useContext(lojaContext)
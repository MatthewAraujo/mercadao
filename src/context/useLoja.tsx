"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'


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
  handleResetCart: () => void;
  handleAddToCart: (id: number, quantity: number, price: number) => void;
  handleAddProduct: (id: number) => void;
  handleRemoveProduct: (id: number) => void;
}

const lojaContext = createContext({} as LojaDataProps)

export const LojaProvider = ({ children }: LojaProviderProps) => {
  const [product, setProduct] = useState<Product[]>([])
  const [cart, setCart] = useState<CarrinhoProduto[]>([]);

  function handleResetCart() {
    setCart([]);
  }

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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/produto');
        const result = await response.json();
        const resultArray = result.map((item) => {
          return {
            id: item[0],
            name: item[1],
            price: item[2],
            weight: item[3],
            stock: item[4],
            brand: item[5]
          };
        });
        setProduct(resultArray);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <lojaContext.Provider
    value={{
      product,
      cart,
      handleResetCart,
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
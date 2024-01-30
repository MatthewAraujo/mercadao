"use client"
import { product, useLoja } from "@/context/useLoja"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Carrinho() {
  const router = useRouter()
  if (localStorage.getItem('id') === null) {
    router.push('/login')
  }
  const { cart, product } = useLoja()
  const totalItems = cart.reduce((acc, item) => {
    return acc + item.quantity * product[item.id - 1].price
  }, 0)
  const total = totalItems.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  async function sendData(data) {
    const response = await fetch('http://localhost:3000/seu-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }); 
    return data;
  }
  async function handleSubmit(event) {
    event.preventDefault()
    const products = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })
    const data = {
      products
    }

    const response = await sendData(data)
    console.log(response)
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex w-full">
          <div className="flex items-center justify-center" >
            <StoreIcon className="h-6 w-6" />
            <span className="ml-2 font-semibold text-lg">Neighborhood Market</span>
          </div>
          </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {
              cart.length === 0 ? (
                <div className="flex items-center justify-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                    Your cart is empty
                  </h2>
                </div>
              ) : (
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                  Your cart
                </h2>
              )
            }
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {
                cart.map((item) => {
                  const pro = product.find((product) => product.id === item.id)
                  if (!pro) return null
                  return (
                    <div key={item.id} className="grid">
                      <div className="grid gap-1">
                        <h3 className="text-lg font-bold">{pro.name}</h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400">R${item.price}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg text-gray-500 dark:text-gray-400">Quantidade: {item.quantity}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-lg font-bold">Total: R${ item.price * item.quantity}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div>
              {
                cart.length > 0 && (
                  <div className="flex justify-end mt-8">
                    <span className="text-lg font-bold">Total: {total}</span>
                  </div>
                )
              }
            </div>
            <div className="flex justify-center mt-8">
              {
                cart.length > 0 ? (
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-md" onClick={handleSubmit}>Checkout</button>
                ) : (
                  <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded-md">
                    Go to the store
                  </Link>
                )
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}
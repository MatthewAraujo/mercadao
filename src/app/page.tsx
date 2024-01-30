"use client"
import Link from "next/link";
import { Shop } from "@/components/shop";
import { useLoja } from "@/context/useLoja";
import {useRouter} from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { product } = useLoja();
  if(localStorage.getItem('id') === null){
    router.push('/login')
  }
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <StoreIcon className="h-6 w-6" />
            <span className="ml-2 font-semibold text-lg">
              Neighborhood Market
            </span>
          </Link>
          <Link className="flex items-center justify-center" href="/carrinho">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </header>
        <main className="flex-1">
          <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                Our Products
              </h2>

              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                {product.map((product) => (
                  <div key={product.id} className="grid">
                    <div className="grid gap-1">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.brand}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {product.brand}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {product.weight}
                        </span>

                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {product.stock}
                        </span>
                      </div>

                      <div className="flex  items-center justify-between">
                        <span className="text-lg font-bold">
                          ${product.price}
                        </span>
                          <Shop
                            id={product.id}
                            price={product.price} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
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
  );
}

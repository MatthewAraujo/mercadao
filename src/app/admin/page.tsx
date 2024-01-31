"use client"
import { Link, StoreIcon, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

export default function Admin() {
  const [state, setState] = useState(false)
  const [file, setFile] = useState(null)
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    if (!file) {
      console.error('Nenhum arquivo selecionado');
      return;
    }

    formData.append('file', file)
    fetch('http://127.0.0.1:5000/read', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setState(true)
      })
      .catch(error => console.error(error));

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
                Drag your csv here
              </h2>

              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <form action="" className="flex  justify-between items-center" encType="multipart/form-data">
                  <input type="file" name="file" id="file" className="inputfile" onChange={handleFileChange} />
                  <label htmlFor="file">Choose a file</label>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-md" onClick={handleSubmit}>Send</button>
                </form>
              </div>
            </div>
            {
              state && (
                <div className="container px-4 md:px-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                    Your csv was sent
                  </h2>
                </div>
              )
            }
          </section>
        </main>
      </div>
    </div>
  )
}
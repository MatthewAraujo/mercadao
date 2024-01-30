"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
  if(localStorage.getItem('id') !== null){
    router.push('/')
  }
  async function postData(data: any) {
    console.log(data)
    // const response = await fetch('http://localhost:3000/seu-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });



    return data;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      gender: { value: string }
      cpf: { value: string }
      rua: { value: string }
      bairro: { value: string }
      cidade: { value: string }
      pais: { value: string }
      numero: { value: string }
      tipo: { value: string }

    }
    const name = target.name.value
    const email = target.email.value
    const gender = target.gender.value
    const cpf = target.cpf.value
    const rua = target.rua.value
    const bairro = target.bairro.value
    const cidade = target.cidade.value
    const pais = target.pais.value
    const numero = target.numero.value
    const tipo = target.tipo.value

    const data = {
      name,
      email,
      gender,
      cpf,
      rua,
      bairro,
      cidade,
      pais,
      numero,
      tipo,
    }

    try {
      const response = await postData(data)
      console.log(response)
      localStorage.setItem("id", response.name)
      router.push("/")
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Please enter your details to login</p>
      </div>
      <div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" placeholder="Enter your gender" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="Enter your CPF" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rua">Rua</Label>
              <Input id="rua" placeholder="m@example.com" required type="rua" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input id="bairro" placeholder="Enter your bairro" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" placeholder="m@example.com" required type="cidade" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">Pais</Label>
              <Input id="pais" placeholder="Enter your pais" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numero">Numero</Label>
              <Input id="numero" placeholder="Enter your numero" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Input id="tipo" placeholder="m@example.com" required type="tipo" />
            </div>
            <div>
            </div>
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>

        </form>
      </div>
    </div>
  )
}


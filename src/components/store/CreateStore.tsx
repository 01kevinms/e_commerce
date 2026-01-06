import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateStoreApi } from "../../services/apis/Post.routes"

export default function CreateStore(){
    const navigate = useNavigate()
    const [form, setForm]=useState({
        name:"",
        description:"",
        logo:"",
        slug:""
    })
    const [loading,setLoading]= useState(false)

    function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setForm({...form,[e.target.name]:e.target.value})
    }
    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            await CreateStoreApi(form)
            alert("Loja criada com sucesso!");
           navigate("/store/dashboard");
        } catch (err:any) {
            alert(err.response?.data?.message ?? "Erro ao criar loja");
        }finally{
            setLoading(false)
        }
    }
    return(
         <div className="min-h-screen dark:bg-[#121212] text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-[#1f1f1f] p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Criar minha loja</h1>

        <input
          name="name"
          placeholder="Nome da loja"
          className="w-full p-3 bg-[#2a2a2a] rounded"
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="slug-da-loja"
          className="w-full p-3 bg-[#2a2a2a] rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descrição da loja"
          className="w-full p-3 bg-[#2a2a2a] rounded"
          onChange={handleChange}
        />

        <input
          name="logo"
          placeholder="URL do logo"
          className="w-full p-3 bg-[#2a2a2a] rounded"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded"
        >
          Criar loja
        </button>
      </form>
    </div>
    )
}
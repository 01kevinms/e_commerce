import React, { useState } from "react"
import type { ProductCreate } from "../../types/cards"
import { CreateProductAPI } from "../../services/apis/Post.routes"

export default function CreateProduct({onclose}:any){
    const [form, setForm]=useState<ProductCreate>({
         name: "",
  category: "",
  stock: 0,
  price:0,
  description: "",
  images: [],
    })
    const [loading,setLoading]= useState(false)
    const[previewUrl,setpreviewUrl]= useState<string | null>(null)
    const[selected,setSelected]= useState<File | null>(null)


    
   function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=e.target;
        setForm(prev=>({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }))
    }

    function fileSelect(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0] ?? null
        if(file){
            setForm(prev=>({
                ...form,
                images:[...prev.images,file]
            }))
           const reader = new FileReader();
      reader.onloadend = () => setpreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
    }

   async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(!form.name || !form.category)return;
        setLoading(true)
        try {
            await CreateProductAPI(form)
            alert("Produto criado com sucesso!");

            setForm({ name: "", category: "", price: 0, stock: 0, description: "", images: [] });
            setSelected(null);
            setpreviewUrl(null);
            onclose()
        } catch (err:any) {
             alert(err.response?.data?.message ?? "Erro ao criar Produto");
        }finally{setLoading(false)}
    }
    return(
  <div
  onClick={onclose}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
>
  <form
    onSubmit={handleSubmit}
    onClick={(e) => e.stopPropagation()}
    className="relative w-full max-w-md rounded-2xl 
    bg-gray-100 dark:bg-[#1f1f1f] 
    p-6 space-y-5 shadow-xl animate-in fade-in zoom-in"
  >
    {/* Botão fechar */}
    <button
      type="button"
      onClick={onclose}
      aria-label="Fechar modal"
      className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl transition"
    >
      ✕
    </button>

    {/* Título */}
    <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
      Criar Produto
    </h1>

    {/* Nome */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Nome do produto
      </label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Categoria */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Categoria
      </label>
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Preço */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Preço
      </label>
      <input
        name="price"
        type="number"
        min={1}
        value={form.price}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Estoque */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Quantidade em estoque
      </label>
      <input
        name="stock"
        type="number"
        min={1}
        value={form.stock}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Descrição */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Descrição
      </label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Upload de imagem */}
    <div className="space-y-2">
      <label className="text-sm text-gray-600 dark:text-gray-400">
        Imagem do produto
      </label>

      <label
        className="flex flex-col items-center justify-center gap-2
        border-2 border-dashed border-gray-400 dark:border-gray-600
        rounded-lg p-4 cursor-pointer
        hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition"
      >
        <span className="text-sm opacity-70">
          Clique para enviar uma imagem
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={fileSelect}
          className="hidden"
        />
      </label>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview da imagem"
          className="mx-auto w-40 h-40 object-cover rounded-lg"
        />
      )}
    </div>

    {/* Botões */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 
      text-white py-3 rounded-lg transition"
    >
      {loading ? "Salvando..." : "Criar Produto"}
    </button>

    <button
      type="button"
      onClick={onclose}
      className="w-full border border-gray-400 dark:border-gray-600 
      py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition"
    >
      Cancelar
    </button>
  </form>
</div>

    )
}
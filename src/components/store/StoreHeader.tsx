import { useState } from "react";
import CreateProduct from "./CreateProduct";

type StoreHeaderProps = {
  name: string;
  logo?: string;
  description?: string;
  createdAt?: string;
};

export function StoreHeader({ name, logo, description, createdAt }: StoreHeaderProps) {
   const [formCreate,setFormCreate]= useState(false)

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-8 bg-gray-200  dark:bg-[#1f1f1f] p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-300 font-bold text-xl">{name[0]}</span>
          )}
        </div>

        {/* Info da loja */}
        <div>
          <h1 className="text-2xl font-bold ">{name}</h1>
          {description && <p className=" text-sm">{description}</p>}
          {createdAt && (
            <p className="text-xs">
              Criada em {new Date(createdAt).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>

      {/* Botão de ação */}
      <button
      onClick={()=>setFormCreate(!formCreate)}  
        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
      >
        + Novo produto
      </button>
      {formCreate && (
        <CreateProduct onclose={()=>setFormCreate(!formCreate)}/>
      )}
    </header>
  );
}

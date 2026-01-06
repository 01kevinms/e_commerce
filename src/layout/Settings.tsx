import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { useEffect, useState } from "react";
import { DeleteCount } from "../services/apis/Delete.routes";
import { getProfile } from "../services/apis/Get.routes";
import { UpdatePasswordForm } from "../components/cards/UpdatePass";
import { ModalPassword } from "../components/modals/ModalPassword";

// Página de configurações
function Settings() {
  const navigate = useNavigate()
  const[user,setUser]=useState<any>()
  const[confirming,setConfirming]= useState(false)
  const[loading,setLoading]=useState(false)
   useEffect(()=>{
          getProfile().then(setUser).catch(()=>console.log(`not authorized`))
      },[])

      
  function handleLogout() {
    navigate("/signin");
  }
  function handleDelete(id:string){
    DeleteCount(id)
  }
 
  return (
    <div className="space-y-6">

      {/* HEADER DA PÁGINA */}
      <header className="rounded-2xl m-4 bg-white dark:bg-gray-800 p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Configurações
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Gerencie preferências e ajustes da sua conta
        </p>
      </header>

      {/* GRID DE CONFIGURAÇÕES */}
      <section className="grid m-5 gap-6">

        {/* APARÊNCIA */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Aparência
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Tema
            </span>

            <ThemeToggle />
          </div>
        </div>

        {/* CONTA */}
       {/* CONTA DO USUÁRIO */}
<div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow space-y-6">

  {/* TÍTULO */}
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
    Conta
  </h2>

  {/* PERFIL */}
  <div className="flex items-center gap-4">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
      K
    </div>

    <div>
      {user &&(
<>
        <p className="font-semibold text-gray-800 dark:text-gray-100">
       {user.name}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {user.email}
      </p>
</>
      )}
    </div>
  </div>

  <div className="h-px bg-gray-200 dark:bg-gray-700" />

  {/* OPÇÕES */}
  <div className="space-y-3">

    <button onClick={()=>navigate("/profile")}
      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      <span>Editar perfil</span>
      <span className="text-gray-400">→</span>
    </button>

      <button
      onClick={()=>setLoading(!loading)}
      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >      
      <span>Alterar senha</span>
      <span className="text-gray-400">→</span>
    </button>
     {loading &&(
       <ModalPassword 
       open={loading}
       onClose={()=>setLoading(false)}
       >
       <UpdatePasswordForm />
        </ModalPassword>
        )}
  

    <button
    onClick={handleLogout}
      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
    >      
      <span>Sair da conta</span>
      <span>⎋</span>
    </button>
 <button
  onClick={() => setConfirming(true)}
  className="px-4 py-2 rounded transition bg-transparent border text-white hover:bg-red-600"
>
  Excluir
</button>

{confirming && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-sm rounded-xl bg-[#1f1f1f] p-6 shadow-lg">

      <h2 className="mb-2 text-lg font-bold text-white">
        Confirmar ação
      </h2>

      <p className="mb-6 text-gray-300">
        Tem certeza que deseja excluir esta conta?
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setConfirming(false)}
          className="rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
        >
          Cancelar
        </button>

        <button
          onClick={() => {
            handleDelete(user.id);
            setConfirming(false);
          }}
          className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          Confirmar
        </button>
      </div>

    </div>
  </div>
)}


  </div>
</div>


      </section>
    </div>
  );
}

export default Settings;

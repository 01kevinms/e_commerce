import type { PropsFootCart } from "../../types/cards";

export function CartFooter({items,price,hasSelection,onClick}:PropsFootCart){
   
    return(
         <footer className="sticky bottom-0 border-t dark:border-white/10 dark:bg-[#0A0B1A] px-6 py-4 text-gray-800 dark:text-white bg-gray-200">
      <div className="mx-auto flex max-w-5xl justify-between">
        <div>
          <p className="text-md text-gray-600">
            {hasSelection
              ? "Itens selecionados"
              : "Total de itens"}
          </p>
          <p className="text-xl font-bold">{items}</p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-2xl font-bold text-blue-500">
            R$ {price.toFixed(2)}
          </p>

          <button
           onClick={onClick}
            disabled={!hasSelection}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold dark:disabled:opacity-50 disabled:opacity-80 text-white"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </footer>
    )
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GetOrder, getProfile } from "../../services/apis/Get.routes";
import { CancelOrder } from "../../services/apis/Put.routes";
import { DeleteOrder } from "../../services/apis/Delete.routes";
import { ConfirmDelivered } from "../../services/apis/Post.routes";

import { Toast } from "../../components/theme/Toast";
import { ConfirmModal } from "../../components/theme/ConfirmModal";
import { ReviewModal } from "../../components/modals/ReviewModal";
import { OrderCard } from "../../components/cards/OrderCard";
import type { Address } from "../../types/cards";

function UserMain() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);
  const [toast, setToast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [reviewData, setReviewData] = useState<{
    orderId: string;
    product: any;
  } | null>(null);
  useEffect(() => {
    getProfile().then(setUser);
    loadOrders();
  }, []);

  const addressDefault:Address = user?.address.find((addr:Address)=> addr.isDefault)

  async function loadOrders() {
    const data = await GetOrder();
    setOrders(data);
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function confirmCancel(orderId: string) {
    try {
      setLoading(true);
      await CancelOrder(orderId);
      await loadOrders();
      showToast("Pedido cancelado com sucesso", "success");
    } catch {
      showToast("Erro ao cancelar pedido", "error");
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  async function confirmDelete(orderId: string) {
    try {
      setLoading(true);
      await DeleteOrder(orderId);
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast("Pedido removido com sucesso", "success");
    } catch {
      showToast("Erro ao remover pedido", "error");
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  async function HandleConfirm(order:any) {
    try {
      setLoading(true);
      await ConfirmDelivered(order.id);
      await loadOrders();

      // abre escolha de produto (primeiro item por enquanto)
      setReviewData({
        orderId: order.id,
        product: order.items[0].product,
      });

      showToast("Entrega confirmada!", "success");
    } catch {
      showToast("Erro ao confirmar entrega", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-gray-800 dark:text-white ">
     
      {/* HEADER */}
       <header className="flex text-gray-800 dark:text-white flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Minha conta
          </h1>
          <p className="text-gray-600">
            Acompanhe seus pedidos e gerencie seus dados
          </p>
        </div>

        <Link
          to="/profile"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white"
        >
          Editar perfil
        </Link>
       </header>
     {!user?.store && (
      <Link
        to="/user/store"
        className="bg-green-600 px-4 py-2 rounded"
      >
        Criar minha loja
      </Link>
    )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800 dark:text-white">
        <Link
          to="/orders"
          className="dark:bg-[#1f1f1f] border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            📦 Meus pedidos
          </h3>
          <p className="text-sm">
            Acompanhe pedidos realizados
          </p>
        </Link>

        <Link
          to="/profile"
          className="dark:bg-[#1f1f1f] border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            🏠 Endereços
          </h3>
          <p className="text-sm">
            Gerencie seus endereços de entrega
          </p>
        </Link>

        <Link
          to="/settings"
          className="dark:bg-[#1f1f1f] border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            🔒 Segurança
          </h3>
          <p className="text-sm">
            Alterar senha e segurança
          </p>
        </Link>
      </section>

      {/* ORDERS */}
      <section className="dark:bg-[#1f1f1f] bg-gray-200 text-gray-800 dark:text-white border pr-2 space-y-3 overflow-y-auto border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Últimos pedidos
        </h2>

        <div className="space-y-3">
          {orders.length ? (
            orders.slice(0,3).map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onCancel={(id: string) =>
                  setModal({ type: "cancel", orderId: id })
                }
                onDelete={(id: string) =>
                  setModal({ type: "delete", orderId: id })
                }
                onConfirmDelivered={()=>HandleConfirm(order)}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              Nenhum pedido encontrado
            </p>
          )}
        </div>
      </section>

       {/* DADOS BÁSICOS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dark:bg-[#1f1f1f] bg-gray-200 border border-gray-700 rounded-xl p-6">
          <h3 className="font-semibold mb-3">
            Dados pessoais
          </h3>
         {user ? (
          <>
           <p className="text-sm ">
            Nome: <span>{user.name}</span>
          </p>
          <p className="text-sm ">
            Email: <span>{user.email}</span>
          </p>
          </>
          ):( <p></p> )}
        </div>

        <div className="dark:bg-[#1f1f1f] text-gray-800 dark:text-white bg-gray-200 border border-gray-700 rounded-xl p-6">
          <h3 className="font-semibold mb-3">
            Endereço principal
          </h3>

           {addressDefault ? (
          <>
          <p className="text-sm">
           {addressDefault.city} - {addressDefault.zip} - {addressDefault.country}
          </p>         
           <p className="text-sm">
            {addressDefault.number}
          </p>
           <p className="text-sm">
            {addressDefault.street}
          </p>
          <Link
            to="/profile"
            className="text-blue-500 text-sm mt-2 inline-block"
          >
            Gerenciar endereços
          </Link>
          
          </>
          ):( <p></p> )}
        </div>
      </section>

      {/* REVIEW MODAL */}
      {reviewData && (
        <ReviewModal
          orderId={reviewData.orderId}
          product={reviewData.product}
          onClose={() => setReviewData(null)}
        />
      )}

      {/* CONFIRM MODAL */}
      {modal && (
        <ConfirmModal
          title={
            modal.type === "cancel"
              ? "Cancelar pedido"
              : "Remover pedido"
          }
          message={
            modal.type === "cancel"
              ? "Deseja realmente cancelar este pedido?"
              : "Deseja remover este pedido? Essa ação não poderá ser desfeita."
          }
          confirmText={
            modal.type === "cancel"
              ? "Cancelar pedido"
              : "Remover pedido"
          }
          loading={loading}
          onCancel={() => setModal(null)}
          onConfirm={() =>
            modal.type === "cancel"
              ? confirmCancel(modal.orderId)
              : confirmDelete(modal.orderId)
          }
        />
      )}

      {toast && <Toast {...toast} />}
    </div>
  );
}

export default UserMain;

import { useEffect, useState } from "react";
import { GetOrder, getProfile } from "../../services/apis/Get.routes";
import { OrderCard } from "../../components/cards/OrderCard";
import { ConfirmDelivered } from "../../services/apis/Post.routes";
import { DeleteOrder } from "../../services/apis/Delete.routes";
import { CancelOrder } from "../../services/apis/Put.routes";
import { ConfirmModal } from "../../components/theme/ConfirmModal";
import { ReviewModal } from "../../components/modals/ReviewModal";
import { Toast } from "../../components/theme/Toast";


function ListOrders() {
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
    return(
        <div>
    <section className="dark:bg-[#1f1f1f] m-10 bg-gray-200 text-gray-800 dark:text-white border pr-2 space-y-3 overflow-y-auto border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Últimos pedidos
        </h2>

        <div className="space-y-3">
          {orders.length ? (
            orders.map(order => (
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
    )
}

export default ListOrders
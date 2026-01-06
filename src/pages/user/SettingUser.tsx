import { useEffect, useState } from "react";
import { getProfile } from "../../services/apis/Get.routes";
import type { Address } from "../../types/cards";
import { Modal } from "../../components/theme/Modal";
import { AddressForm } from "../../components/address/AddressForm";
import { updateAddress } from "../../services/apis/Put.routes";

function Profile() {
  const [user, setUser] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => alert("not authorized"));
  }, []);

  const defaultAddress: Address | undefined =
    user?.address?.find((addr: Address) => addr.isDefault);

  return (
    <div>
      {/* HEADER */}
      <header className="rounded-2xl m-4 bg-white dark:bg-gray-800 p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Configurações
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Gerencie preferências e ajustes da sua conta
        </p>
      </header>

      {/* CONTEÚDO */}
      <section className="rounded-2xl m-4 bg-white dark:bg-gray-800 p-6 shadow">
        {user && (
          <main className="space-y-4">
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>

            <div className="flex justify-between items-start border-t pt-4">
              {defaultAddress ? (
                <p className="text-gray-300">
                  {defaultAddress.street}, {defaultAddress.number} –{" "}
                  {defaultAddress.city} / {defaultAddress.country}
                  <br />
                  CEP: {defaultAddress.zip}
                </p>
              ) : (
                <p className="text-gray-400">
                  Nenhum endereço padrão cadastrado
                </p>
              )}

              <button
                onClick={() => setIsEditing(true)}
                disabled={!defaultAddress}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                Editar endereço
              </button>
            </div>
          </main>
        )}
      </section>

      {/* MODAL */}
      {isEditing && defaultAddress && (
        <Modal onClose={() => setIsEditing(false)}>
          <h2 className="text-xl font-bold mb-4">
            Editar endereço
          </h2>

          <AddressForm
            initialData={defaultAddress}
            onCancel={() => setIsEditing(false)}
            onSubmit={async data => {
              const updated = await updateAddress(
                defaultAddress.id!,
                data
              );

              // 🔥 Atualiza o estado local do usuário
              setUser((prev: any) => ({
                ...prev,
                address: prev.address.map((addr: Address) =>
                  addr.id === updated.id ? updated : addr
                ),
              }));

              setIsEditing(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Profile;

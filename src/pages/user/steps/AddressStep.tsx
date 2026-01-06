import { useState } from "react";
import type { Address } from "../../../types/cards";
import { updateAddress } from "../../../services/apis/Put.routes";
import { AddressForm } from "../../../components/address/AddressForm";
import { Modal } from "../../../components/theme/Modal";

type Props = {
  user: any;
  addressId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  onAddressUp: (address: Address) => void;
};

export default function AddressStep({
  user,
  addressId,
  onSelect,
  onNext,
  onBack,
  onAddressUp,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const selectedAddress = user?.address?.find(
    (addr: Address) => addr.id === addressId
  );

  function handleEdit() {
    if (!selectedAddress) return;
    setIsEditing(true);
  }

  return (
    <div className="space-y-6">
      {/* TÍTULO */}
      <div>
        <h2 className="text-2xl font-semibold">Endereço de entrega</h2>
        <p className="text-sm text-gray-400">
          Escolha onde deseja receber seu pedido
        </p>
      </div>

      {/* BOTÃO EDITAR */}
      <button
        onClick={handleEdit}
        disabled={!selectedAddress}
        className="bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50"
      >
        Editar endereço
      </button>

      {/* LISTA */}
      <div className="space-y-3">
        {user?.address?.map((addr: Address) => {
          const selected = addressId === addr.id;

          return (
            <button
              key={addr.id}
              type="button"
              onClick={() => onSelect(addr.id!)}
              className={`w-full text-left p-4 rounded-lg border transition
                ${
                  selected
                    ? "border-green-500 bg-green-600/20"
                    : "border-gray-700 bg-[#2a2a2a] hover:border-gray-500"
                }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {addr.street}, {addr.number}
                  </p>
                  <p className="text-sm text-gray-400">
                    {addr.city} • {addr.zip}
                  </p>
                  <p className="text-sm text-gray-400">
                    {addr.country}
                  </p>
                </div>

                {addr.isDefault && (
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                    Padrão
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* AÇÕES */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="w-1/2 bg-gray-700 py-3 rounded-lg"
        >
          Voltar
        </button>

        <button
          onClick={onNext}
          disabled={!addressId}
          className="w-1/2 bg-green-600 py-3 rounded-lg disabled:opacity-50"
        >
          Continuar
        </button>
      </div>

      {/* MODAL */}
      {isEditing && selectedAddress && (
        <Modal onClose={() => setIsEditing(false)}>
          <h2 className="text-xl font-bold mb-4">
            Editar endereço
          </h2>

          <AddressForm
            initialData={selectedAddress}
            onCancel={() => setIsEditing(false)}
            onSubmit={async data => {
              const updated = await updateAddress(
                selectedAddress.id,
                data
              );

              onAddressUp(updated);
              setIsEditing(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

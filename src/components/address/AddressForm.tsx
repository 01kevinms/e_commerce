import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { addressSchema, type AddressFormData } from "../../types/cards";
import { Input } from "./Input";
type Props = {
  initialData?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
};

export function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Rua"
        {...register("street")}
        error={errors.street}
      />

      <Input
        label="Número"
        type="number"
        {...register("number", { valueAsNumber: true })}
        error={errors.number}
      />

      <Input
        label="Cidade"
        {...register("city")}
        error={errors.city}
      />

      <Input
        label="CEP"
        {...register("zip")}
        error={errors.zip}
      />

      <Input
        label="País"
        {...register("country")}
        error={errors.country}
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isDefault")} />
        Endereço principal
      </label>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-600"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-green-600"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
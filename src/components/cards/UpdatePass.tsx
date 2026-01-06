import { useState } from "react";
import { updatePassword } from "../../services/apis/Put.routes";
import { Toast } from "../theme/Toast";

export function UpdatePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<any>(null);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirm) {
      showToast("As senhas não conferem", "error");
      return;
    }

    try {
      setLoading(true);
      await updatePassword({
        currentPassword,
        newPassword,
      });

      showToast("Senha atualizada com sucesso", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: any) {
      showToast(
        err?.response?.data?.message ||
          "Erro ao atualizar senha",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1f1f1f] p-6 rounded-xl space-y-4 max-w-md"
    >
      <h2 className="text-xl font-semibold">
        Atualizar senha
      </h2>

      <input
        type="password"
        placeholder="Senha atual"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        className="w-full p-2 rounded bg-[#2a2a2a]"
        required
      />

      <input
        type="password"
        placeholder="Nova senha"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="w-full p-2 rounded bg-[#2a2a2a]"
        required
      />

      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        className="w-full p-2 rounded bg-[#2a2a2a]"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        {loading ? "Salvando..." : "Atualizar senha"}
      </button>

      {toast && <Toast {...toast} />}
    </form>
  );
}

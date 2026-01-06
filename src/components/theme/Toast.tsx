type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}

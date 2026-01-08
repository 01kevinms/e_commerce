type LoadingProps = {
  message?: string;
};

export default function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />

      <p className="mt-4 text-white text-sm tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}

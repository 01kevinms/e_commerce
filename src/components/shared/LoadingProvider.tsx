import { createContext, useContext, useState } from "react";
import Loading from "./Loading";

type LoadingContextType = {
  show: (message?: string) => void;
  hide: () => void;
};

const LoadingContext = createContext({} as LoadingContextType);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  return (
    <LoadingContext.Provider
      value={{
        show: (msg) => {
          setMessage(msg);
          setLoading(true);
        },
        hide: () => setLoading(false),
      }}
    >
      {children}
      {loading && <Loading message={message} />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

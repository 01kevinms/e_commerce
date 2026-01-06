import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../types/cards";
import { LoginUser, RegisterUser } from "./apis/Post.routes";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  name: string;
  email: string;
  exp: number;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 Recupera sessão ao recarregar */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);

        // 🔒 verifica expiração
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(storedToken);
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
          });
        }
      } catch {
        logout();
      }
    }

    setLoading(false);
  }, []);

  /* 🔐 LOGIN */
  async function login(email: string, password: string) {
    const { accessToken,refreshToken } = await LoginUser(email, password);

    const decoded = jwtDecode<JwtPayload>(accessToken);

    localStorage.setItem("token", accessToken);
    localStorage.setItem("token", refreshToken);

    setToken(accessToken);
    setUser({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    });
  }

  /* 📝 REGISTER */
  async function register(name: string, email: string, password: string) {
    await RegisterUser(name, email, password);
  }

  /* 🚪 LOGOUT */
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

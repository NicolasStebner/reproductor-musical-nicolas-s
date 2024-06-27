import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define la forma de los datos en el contexto
interface AuthContextType {
  access_token: string | null;
  listo: boolean;
  toggleListo: () => void;
  changeAccessToken: (value: string) => void;
}

// Crea el contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea un hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Define el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [listo, setListo] = useState<boolean>(true);
  const [access_token, setAccessToken] = useState<string | null>(null);

  const toggleListo = () => {
    setListo(!listo);
  };

  const changeAccessToken = (newValue: string) => {
    setAccessToken(newValue);
  };

  return (
    <AuthContext.Provider
      value={{ listo, toggleListo, access_token, changeAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

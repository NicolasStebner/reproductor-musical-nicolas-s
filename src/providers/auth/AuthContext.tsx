import React, { createContext, useState, useContext, ReactNode } from "react";

// Define la forma de los datos en el contexto
interface AuthContextType {
  access_token: string | null;
  listo: boolean;
  userFollowedSomeone: boolean;
  toggleListo: () => void;
  changeAccessToken: (value: string) => void;
  toggleUserFollowedSomeone: () => void;
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
  //posible refactor a otro auth
  const [userFollowedSomeone, setUserFollowedSomeone] =
    useState<boolean>(false);

  const toggleListo = () => {
    setListo(!listo);
  };

  const changeAccessToken = (newValue: string) => {
    setAccessToken(newValue);
  };

  const toggleUserFollowedSomeone = () => {
    setUserFollowedSomeone(!userFollowedSomeone);
  };

  return (
    <AuthContext.Provider
      value={{
        listo,
        toggleListo,
        access_token,
        changeAccessToken,
        userFollowedSomeone,
        toggleUserFollowedSomeone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

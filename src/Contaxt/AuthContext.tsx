import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type Auth = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<Auth | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(()=>{
   return localStorage.getItem("token")
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

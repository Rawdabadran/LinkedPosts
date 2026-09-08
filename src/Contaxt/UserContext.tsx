import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { baseUrl } from "../Components/ProjectApi/Api";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type UserContextValue = {
  userData: unknown;
  token: string | null;
  setToken: (token: string | null) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  async function getUserData() {
    return await axios.get(`${baseUrl}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const { data: userData } = useQuery({
    queryFn: getUserData,
    queryKey: ["userdata", token], // مهم: التوكين بقى جزء من الـ key
    enabled: !!token,
    select: (data) => data?.data.data.user,
  });

  return (
    <UserContext.Provider value={{ userData, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
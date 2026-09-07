import { createContext, useContext,  type ReactNode, } from "react";
import { baseUrl } from "../Components/ProjectApi/Api";


import axios from "axios";

import { useQuery } from "@tanstack/react-query";
type UserContextValue = {
  userData: unknown;
};

export const UserContext = createContext<UserContextValue>({ userData: undefined });


type Auth = {
  userData: string | null;

};


export default function UserContextProvider({ children }: { children: ReactNode }) 
{




    const token =localStorage.getItem("token");

  async function getUserData() {
   return  await axios.get(`${baseUrl}/users/profile-data`,{
          headers:{
                Authorization:`Bearer ${token}`
                
            }
    })
  }



  const {data:userData}= useQuery({
    queryFn:getUserData,
    queryKey:["userdata"],
    enabled:!!token,
    select:(data)=>data?.data.data.user
   

  })



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

    return (
        <UserContext.Provider value={{userData}}>
            {children}
        </UserContext.Provider>
    )
}

import axios from "axios"
import { baseUrl } from "../../Components/ProjectApi/Api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Contaxt/AuthContext";
import { useState } from "react";
import Loading from "../../Components/Shard/loading/loading"

import PostCard from "../../Components/Shard/PostCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import type { post } from "../../interFaces/AllPosta";

export default  function AllPosts() {
    



const auth  =useContext(AuthContext)
if(!auth)
     {
    throw new Error("this auth must be in contextProvider")
     }
   
   const  {token}=auth;


    async function getALLPosts(){
        
     
        return  await axios.get(`${baseUrl}/posts?limit=10&sort=-createdAt`,{
            headers:{
                Authorization:`Bearer ${token}`
                
            }
        
         })

       
   



    }


   let {data,isError,isLoading,refetch} =useQuery({
    queryKey:["posts"],
    queryFn:getALLPosts,
   select:(data)=> data?.data.data.posts,
   retry:5,
   retryDelay:5000,
   retryOnMount:false,
   refetchOnWindowFocus:false,
   staleTime:2000,
  //  gcTime:2000,
   
  }) 
   


  

  return (


    <div className=" ">
  {  isLoading?<Loading/>:" "}

     {isError?<p className="text-center h-screen text-red-600 text-xl flex justify-center items-center font-semibold"> Posts Loading Fail</p>:" "}
      {data?.map((post:post)=>(
        <PostCard  details={false} {...post} key={post._id}/>
      ))
      
      } 


</div>
      
  )
}



import { useContext } from "react";
import { AuthContext } from "../../Contaxt/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../Components/ProjectApi/Api";
import PostCard from "../Shard/PostCard/PostCard";
import { useParams } from "react-router-dom";

  
 
export default function PostDetailsComments({singlePost}:any) {


  

 const auth  =useContext(AuthContext)
 if(!auth)
      {
     throw new Error("this auth must be in contextProvider")
      }
    
    const  {token}=auth;

    async function getPostComments()
    {
        return await axios.get(`${baseUrl}/posts/${singlePost._id}/comments?page=1&limit=10&sort=-createdAt`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

    }


 let {data,isLoading, isError}= useQuery(
    {
        queryKey:["postComments"],
        queryFn:getPostComments,
        select:(data)=> data?.data.data,
       
    }
    
 )














  return (
    <div className="h-screen">
      

      <PostCard details={true} {...singlePost} {...data} key={singlePost?._id}/>
    </div>
  )
}

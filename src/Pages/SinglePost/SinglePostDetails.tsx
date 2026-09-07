
 import axios from "axios";
import { baseUrl } from "../../Components/ProjectApi/Api";
     import { useParams } from "react-router-dom";
import { AuthContext } from "../../Contaxt/AuthContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shard/loading/loading";
import PostCard from "../../Components/Shard/PostCard/PostCard";
import PostDetailsComments from "../../Components/PostDetailsComments/PostDetailsComments";

export default function  SinglePostDetails ()
{ 

     const {postId} = useParams();

 const auth  =useContext(AuthContext)
 if(!auth)
      {
     throw new Error("this auth must be in contextProvider")
      }
    
    const  {token}=auth;

    async function getPostDetails()
    {
        return  await axios.get(`${baseUrl}/posts/${postId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

    }


 let {data,isLoading, isError}= useQuery(
    {
        queryKey:["postDetails",postId],
        queryFn:getPostDetails,
        select:(data)=> data?.data.data.post,
       
    }
    
 )






     return(
        <>
      

       {isError?<p className="text-center h-screen text-red-600 text-xl flex justify-center items-center font-semibold"> Posts Loading Fail</p>:" "}
         

           {  isLoading?<Loading/>:<PostDetailsComments singlePost={data} key={data?._id}/>}
       
        </>
     )
} ;


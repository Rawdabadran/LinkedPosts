


import axios from "axios";
import { baseUrl } from "../../ProjectApi/Api";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contaxt/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../../../Contaxt/UserContext";

export default function LikePost({likesCount,PostId,likes}:{likesCount:number,PostId:string,likes:string[]}) {

const {userData}=useContext(UserContext) 
  const [liked,setLiked]=useState<boolean>(
    likes.includes((userData as { _id?: string } | null | undefined)?._id ?? "")
  );
   

     const auth  =useContext(AuthContext)
     if(!auth)
          {
         throw new Error("this auth must be in contextProvider")
          }
        
        const  {token}=auth;

async function LikePost(){
 return await axios.put(`${baseUrl}/posts/${PostId}/like`,{},{
       headers:{
                Authorization:`Bearer ${token}`
                
            }
 })
}

const qerey =useQueryClient()

const {mutate,data}=useMutation({
    mutationFn :LikePost,
    onSuccess:(res)=>{
    console.log()
    setLiked(res.data.data.liked)

    qerey.invalidateQueries({queryKey:["userPosts"]})  
    qerey.invalidateQueries({queryKey:["posts"]})  
    },

      onError: (error) => {
    console.error("فشل الحذف:", error);
  },



})





  return (
    <div>
      	<div className="flex items-center space-x-2">
				<button onClick={()=>{mutate()}} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
					{liked?<FaHeart className="text-red-600 " />:<FaHeart /> } 
					<span>{likesCount}</span>
				</button>
			</div>
    </div>
  )
}

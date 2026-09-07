import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { GoImage } from "react-icons/go";
import { baseUrl } from '../../ProjectApi/Api';
import { AuthContext } from '../../../Contaxt/AuthContext';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CreatePost() {

    const [Imge,setImge]=useState(null);

 const fileInput = useRef<HTMLInputElement | null>(null)
  


    const auth = useContext(AuthContext);
    const token = auth?.token;


 console.log()
  const {register,handleSubmit,reset} =useForm({
    defaultValues:{
        body:" ",
    }
  })
  function sendFile(e:any){
 setImge(e.target.files[0]);
  }

  


   async function createPost(CommentData:any){
    return  await axios.post(`${baseUrl}/posts`,CommentData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

   } 


   const qurey =useQueryClient();

   const {data,mutate,isPending}=useMutation({
    mutationFn:createPost,
   
    onSuccess:(res)=>{
       reset()
      toast.success(res.data.message)
     qurey.invalidateQueries({queryKey:["posts"]});
    
     qurey.invalidateQueries({queryKey:["userPosts"]})  ;

    }



    
   })
   


     function SendData(data:any){

    if (data.body || Imge) {
    const FD = new FormData();

      if (data.body !== " ") {
        FD.append("body", data.body)
      }
      if (Imge != null) {
        FD.append("image", Imge)
          console.log( "formData:"+ FD)
      }
      mutate(FD)

    }
    
  } 


  return (
    <div className=''>
      {/* <!-- component --> */}


 <form action="" onSubmit={handleSubmit(SendData)}>
     <div className="bg-white mt-5 editor rounded-2xl  mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
     <div className="heading text-center font-bold text-xl m-5 text-sky-800"> Post now</div>
    <input  {...register("body")} className="title bg-gray-100 border rounded-3xl border-gray-300 p-2 px-5 mb-4 outline-none"  placeholder=" what you think.." type="text"/>
   
  
    {/* <!-- buttons --> */}
    <div className="buttons flex flex-row-reverse justify-between">
     <div className=' flex'>
         <div className="btn border border-gray-300 p-1 px-4 font-semibold text-xs  rounded-2xl cursor-pointer text-gray-500 ml-auto">Cancel</div>
      {isPending?<button type='submit' className="btn border border-gray-700 p-1 px-4 font-semibold text-xs  rounded-2xl cursor-pointer text-gray-50 ml-2 bg-gray-500">posting...</button>:<button type='submit' className="btn border border-sky-700 p-1 px-4 font-semibold text-xs  rounded-2xl cursor-pointer text-gray-200 ml-2 bg-sky-700">Post</button>} 
     </div>
       <GoImage onClick={()=>{fileInput.current?.click()}}  className=" hover:text-sky-700 " />
      <input onChange={(e)=>{sendFile(e)}} ref={fileInput} type='file' hidden />
    </div>
  </div>
 </form>
    </div>
  
  )
}

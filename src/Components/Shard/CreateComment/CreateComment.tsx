
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { GoImage } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from "axios";
import { baseUrl } from "../../../Components/ProjectApi/Api";

import { AuthContext } from "../../../Contaxt/AuthContext";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


function CreateComment({PostId}:{PostId:string}) {

    const auth = useContext(AuthContext);
    const token = auth?.token;

    const [imge, setImge] = useState<File | null>(null);
    const { register, handleSubmit,reset:restform } = useForm({
        defaultValues: {
            content: "",
        }
    });
     
     let imgeFile =useRef<HTMLInputElement|null>(null);
     function SelcetImg(e:any)
    {
      
       
        setImge(e.target.files[0]);
    }
 



  async function createComment(CommentData:any){
    return  await axios.post(`${baseUrl}/posts/${PostId}/comments`,CommentData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

   } 

 const qerey= useQueryClient()  

 const { mutate ,data ,isPending} = useMutation({
    mutationFn:createComment,
    onSuccess:(res)=>{
        restform()
        toast.success(res.data.message)
     qerey.invalidateQueries({queryKey:["posts"]})  
     qerey.invalidateQueries({queryKey:["postComments"]})  
     qerey.invalidateQueries({queryKey:["userPosts"]})  

    },
    onError:(err)=>{
 
        toast.success(err.data.message||"there is an error")
    }
 })


function sendComment(data: any) {
    if (data.content?.trim()) {
        const fd = new FormData();
        fd.append("content", data.content);
        if (imge) {
            fd.append("image", imge);
        }
        mutate(fd);
    }
}



	return(
        <>
    
         <form onSubmit={handleSubmit(sendComment)}>
<div  className="my-3 flex  w-full justify-between items-center">
        <input type="text" {...register("content")} className=" p-2 border  outline-none rounded-[999px] ps-3  bg-slate-200 w-5/6 text-xs focus:border-sky-700  focus:border-2"  placeholder="Enter your comment"/>
           <GoImage  onClick={()=>{imgeFile.current?.click()}} className=" hover:text-sky-700 " />
          <input onChange={SelcetImg} ref={imgeFile} type="file" className="hidden" />

           {isPending?(<AiOutlineLoading3Quarters  className="text-sky-700"/>): <button  type="submit" className=" hover:text-sky-700 "> <FiSend /></button>}

    
</div>
      </form>
        </>
    )
};

export default CreateComment;

"use client";
import { MdDeleteOutline } from "react-icons/md";
import {Button, Dropdown, Kbd, Label} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "../../ProjectApi/Api";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contaxt/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { Modal} from "@heroui/react";


import { useRef } from "react";


import { useForm } from 'react-hook-form'

import { GoImage } from "react-icons/go";

import { QueryClient} from '@tanstack/react-query';


















export function Drop({PostId}:{PostId:string}) {
 
    const [isOpended,setOpend]=useState(false)

     const auth  =useContext(AuthContext)
     if(!auth)
          {
         throw new Error("this auth must be in contextProvider")
          }
        
        const  {token}=auth;

async function DeletPosts(){
 return await axios.delete(`${baseUrl}/posts/${PostId}`,{
       headers:{
                Authorization:`Bearer ${token}`
                
            }
 })
}

const qerey =useQueryClient()

const {mutate,data}=useMutation({
    mutationFn :DeletPosts,
    onSuccess:(res)=>{

    toast.success(res.data.message)
    qerey.invalidateQueries({queryKey:["userPosts"]})  
    qerey.invalidateQueries({queryKey:["posts"]})  
    },
      onError: (error) => {
    console.error("فشل الحذف:", error);
  },

})








 //Edit Post



 const [Imge,setImge]=useState(null);

 const fileInput = useRef<HTMLInputElement | null>(null)
  


  const {register,handleSubmit,reset} =useForm({
    defaultValues:{
        body:" ",
    }
  })
  function sendFile(e:any){
 setImge(e.target.files[0]);
  }

  


   async function EditPost(CommentData:any){
    return  await axios.put(`${baseUrl}/posts/${PostId}`,CommentData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

   } 


   const qurey =useQueryClient();

   const {data:edited,mutate:mutateEdit,isPending}=useMutation({
    mutationFn:EditPost,
   
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
      mutateEdit(FD)

    }
    
  } 



  return (
    <>
    <Dropdown >
      <Button  aria-label="Menu" variant="ghost">
       <BsThreeDotsVertical />
      </Button >
      <Dropdown.Popover>
        <Dropdown.Menu  className="w-3/4">
       
          <Dropdown.Item onClick={()=>{setOpend(true)}} className="flex justify-between" id="save-file" textValue="Save file">
          
            <Label>Edit</Label>
            <FiEdit2 />
          </Dropdown.Item>
          <Dropdown.Item  onClick={()=>{mutate()}} id="delete-file" className="flex justify-between" textValue="Delete file" variant="danger">
         
            <Label>Delete </Label>
            <MdDeleteOutline />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>

      
    </Dropdown>


    <Modal isOpen={isOpended} className ="w-full">
      
      <Modal.Backdrop className ="w-full" >
      <form action="" onSubmit={handleSubmit(SendData)}>  
        <Modal.Container   >
          <Modal.Dialog className=" w-full">
            <Modal.CloseTrigger onClick={()=>{setOpend(false)}}  />
            <Modal.Header>

              <Modal.Heading>Edit Post</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="w-full">
             
                  <div className="bg-white mt-5 editor rounded-2xl  mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg w-full my-5">
                  
                 <input  {...register("body")} className="title bg-gray-100 border rounded-3xl border-gray-300 p-2 px-5 mb-4 outline-none"  placeholder=" what you think.." type="text"/>
                
               
                 {/* <!-- buttons --> */}
                 <div className="buttons flex flex-row-reverse justify-between">
                  <div className=' flex'>
                     
                    <GoImage onClick={()=>{fileInput.current?.click()}}  className=" hover:text-sky-700 " />
                   <input onChange={(e)=>{sendFile(e)}} ref={fileInput} type='file' hidden />
                 </div>
               </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
    
                   {isPending?<button type='submit' className="btn border border-gray-700 p-1 px-4 font-semibold text-xs  rounded-2xl cursor-pointer text-gray-50 ml-2 bg-gray-500">posting...</button>:<button type='submit' onClick={()=>{setOpend(false)}}  className="btn border border-sky-700 p-1 px-4 font-semibold text-xs  rounded-2xl cursor-pointer text-gray-200 ml-2 bg-sky-700">Post</button>} 
             
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
              </form>

      </Modal.Backdrop>
    </Modal>

</>
    
  );
}
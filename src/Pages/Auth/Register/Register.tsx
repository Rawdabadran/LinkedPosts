
import {Input, Label} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import {useForm} from  "react-hook-form"
import {Button} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
 import {  toast } from 'react-toastify';
import  {custmValidationEScema }from'../../../ValidationEscema/RegisterEscema'
import { sendDate } from "../../../services/Auth/Register";
import type {DataInterFace} from "../../../interFaces/Register"




export default function Register() {

  let Navegate =useNavigate();

  const {register,handleSubmit,formState:{errors}}= useForm({
    resolver:zodResolver(custmValidationEScema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      gender:undefined,
      dateOfBirth:"",
      password:"",
      rePassword:""
    },
    mode:"onBlur"
  });
  
  async function submitForm( data:DataInterFace){
   try{
     console.log("submit",data)
     let result= await sendDate(data);
     let mes=result.data.message;
     toast.success(mes);
     Navegate("/")
     
   }
   catch{
     toast.error("Enter a vaild data")
   }
  
  }

  return (
    <section  className=" lg:w-[85%] h-screen md:w-full p-12 m-auto ">
    
  

    <h1 className="text-center font-bold text-5xl text-sky-800 mb-4 ">Register Now</h1>
    {/* <h2>x:{x.current}</h2>
    <button onClick={changeX}> chang X</button> */}


    <form className='text-center xl:w-2/3 lg:w-[80%] md:w-full  m-auto mt-5 pt-10  grid  lg:grid-cols-2 md:grid-cols-1 gap-5    shadow-2xl rounded-2xl bg-white p-12' onSubmit={handleSubmit(submitForm)} >
<div className="fristGroup flex flex-col w-full gap-y-5 items-start " >
  <Label htmlFor="name"> Name</Label>
  <Input  aria-label="Name" {...register("name")} id="name"   className="w-full" placeholder="Enter your name" /> 
  {errors.name&&(<p className="text-red-500 text-md text-start">{errors.name.message}</p>)}
 
  <Label htmlFor="username"> User</Label>
<Input aria-label="username" id="username" {...register("username")}  className="w-full" placeholder="Enter Username" /> 
 {errors.username&&(<p className="text-red-500 text-md text-start">{errors.username.message}</p>)}
  
  <Label htmlFor="email"> Email</Label>
<Input aria-label="email" id="email" {...register("email")} 
  

 className="w-full" type='email'  placeholder="Enter your Mail" /> 
{errors.email&&(<p className="text-red-500 text-md text-start">{errors.email.message}</p>)}
</div>

<div className="secoundGroup flex flex-col gap-y-5  items-start">
 
  <Label htmlFor="pass"> PassWord</Label>
  <Input aria-label="password" id="pass" className="w-full" {...register("password")} type='password' placeholder="Enter your Password" /> 
 {errors.password&&(<p className="text-red-500 text-md text-start">{errors.password.message}</p>)}
 
  <Label htmlFor="repass"> Confirm Password</Label>
<Input aria-label="rePassword" id="repass" className="w-full"  type='password' {...register("rePassword")}  placeholder="  Rewrite the PassWord " /> 
 {errors.rePassword&&(<p className="text-red-500 text-md text-start">{errors.rePassword.message}</p>)}
 
  <Label htmlFor="Date"> Date</Label>
<Input aria-label="date" id="Date" className="w-full" type='date'{...register("dateOfBirth" )}  placeholder="Enter your Date Of brith" /> 
 {errors.dateOfBirth&&(<p className="text-red-500 text-md text-start">{errors.dateOfBirth.message}</p>)}

</div>

<div className=" text-left">
  <Label className=" mb-5">Gender</Label>
  <select className="lg:w-[200%] w-[98%] border-2 rounded-3xl p-2"  {...register("gender"
 )} >
      
      <option value="female">Female</option>
      <option value="male">male</option>

    </select>
 {errors.gender&&(<p className="text-red-500 text-md text-start">{errors.gender.message}</p>)}

    <Button className=" lg:w-[200%] w-full my-4" type="submit" >Submit</Button>
</div>
    </form>
    </section>
  )
}

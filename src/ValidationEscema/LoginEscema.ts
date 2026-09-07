
import * as z from "zod"; 


export const custmValidationEScema =z.object({
  
  email:z.string().nonempty("Emial is required").email("enter a vaild email"),
  password:z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"enter a vaild password"),
})

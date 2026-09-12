
import * as z from "zod"; 


export const ChangePasswordEscma=z.object({
password:z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"enter a vaild password"),
newPassword:z.string().nonempty("newPassword is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"enter a vaild password"),

})

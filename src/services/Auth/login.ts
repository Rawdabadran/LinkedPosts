import axios from "axios";
import { baseUrl } from "../../Components/ProjectApi/Api";
import type {LoginInterFace} from "../../interFaces/login";

export async function sendLogDate(data: LoginInterFace)

{

    let response= await axios.post(`${baseUrl}/users/signin`, data);
    return response;
}


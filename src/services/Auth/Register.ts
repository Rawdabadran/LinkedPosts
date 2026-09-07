import axios from "axios";
import { baseUrl } from "../../Components/ProjectApi/Api";
import type {DataInterFace} from "../../interFaces/Register"

export async function sendDate(data:DataInterFace){
    let response= await axios.post(`${baseUrl}/users/signup`, data);
    return response;
}
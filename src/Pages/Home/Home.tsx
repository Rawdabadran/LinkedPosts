

import CreatePost from "../../Components/Shard/CreatePost/CreatePost"
import AllPosts from "../../Pages/AllPosts/AllPosts"
import {Helmet} from "react-helmet";
export default function Home() {
 

 

 
  return (

      
    <div className=" bg-gray-100 ">

<Helmet><title> home</title> </Helmet>
       <CreatePost/> 
       <AllPosts/>
    </div>
  )
}

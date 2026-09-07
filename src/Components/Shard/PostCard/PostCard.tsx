import Posttop from "../PostHeader/Posttop";
import Comment from "../Comments/Comment";
import type { post } from "../../../interFaces/AllPosta";
import CreateComment from "../CreateComment/CreateComment";
export default function PostCard(details:post) {


  return ( 
    <div>
      <div className="bg-gray-100 max-h-auto flex items-center px-5  justify-center pt-10">
           <div className="bg-white  my-5  p-8 rounded-lg shadow-md w-full max-w-xl">
    <Posttop {...details}/>
    

      	<hr className="mt-2 mb-2" />
		<p className="text-gray-800 font-semibold">Comment</p>
    < CreateComment PostId={details._id}/>
		<hr className="mt-2 mb-2" />

      {details.comments?.length > 0 ? (
  <>
    {details.comments.map((comment: any) => (
      <Comment key={comment._id} topComment={comment} />
    ))}
  </>
) : details.topComment ? (
  <Comment topComment={details.topComment as any} />
) : (
  <p className="text-center text-gray-400">there is no Comments</p>
)}
    
		
	</div>
	
</div>
    </div>
  )
}

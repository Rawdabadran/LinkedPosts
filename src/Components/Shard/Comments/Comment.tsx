
interface CommentProps {
	topComment: {
		commentCreator: {
			name: string;
			photo: string;
			_id:string;
		};
		content: string;
		reatedAt: string;
		post: string;
		_id:string;


		
	};
}

import { useContext } from "react";
import { CommentDrop } from "../CommentDrop/CommentDrop"
import { UserContext } from "../../../Contaxt/UserContext";
export default function Comment({ topComment: { commentCreator: { name, photo,_id }, content, reatedAt,post,_id:CommentId} }: CommentProps) {
 
	const {userData} = useContext(UserContext)
	
	return (
    <>
			
		<div className="mt-4 flex justify-between ">
			<div className="flex items-center space-x-2">
				<img src={photo} alt={`${name}'s avatar`} className="w-6 h-6 rounded-full" />
				<div>
					<p className="text-gray-800 font-semibold">{name}</p>
					<p className="text-gray-500 text-sm">{content}</p>
					<p className="text-gray-400 text-xs">{reatedAt}</p>
				</div>
			</div>
		
		{userData._id===_id?(<CommentDrop PostId={post}  ID={CommentId}/>):""}	

		</div>
    </>
  )
}


import { Link } from 'react-router-dom'
import type { PosttopProps } from '../../../interFaces/Post'
import { Drop } from '../DropDowen/Drop';
import { useContext } from 'react';
import { UserContext } from '../../../Contaxt/UserContext';
import LikePost from '../LikePost/LikePost';

export default function Posttop({
image,body,commentsCount,createdAt,_id:PostId,likes,likesCount,details,user}: PosttopProps & { _id: string; details?: boolean }) {
	const { name, photo } = user;
	const authorId = (user as typeof user & { _id?: string })._id;
 
	const {userData}=useContext(UserContext) 

	
	return (
    <div>
 

<div className="flex items-center justify-between mb-4">
			<div className="flex items-center space-x-2">
				<img src={photo} alt="User Avatar" className="w-8 h-8 rounded-full" />
				<div>
					<p className="text-gray-800 font-semibold">{name}</p>
					<p className="text-gray-500 text-sm">{createdAt.split('T').slice(0,1).join(" ")}</p>
				</div>
			</div>
			<div className="text-gray-500 cursor-pointer">
				{(userData as { _id?: string } | null | undefined)?._id === authorId ? <Drop PostId={PostId} /> : null}
			</div>
		</div>
		
		<div className="mb-4">
			<p className="text-gray-800 text-sm font-medium">{body}
				
			</p>
		</div>
		  {details?" ": (
			<Link to={`/postDetails/${PostId}`} className="text-blue-500 text-xs mb-4 block">View Details</Link>
		  )}

		{image?<div className="mb-4">
			<img src={image} alt="Post Image" className="w-full h-48 object-cover rounded-md" />
		</div>:null}
		

		<div className="flex items-center justify-between text-gray-500">
		<LikePost likesCount={likesCount} likes={likes as string[]} PostId={PostId} />
			<button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
				<svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
					</g>
				</svg>
				<span>{commentsCount}</span>
			</button>
		</div>
	









   
    </div>
  )
}

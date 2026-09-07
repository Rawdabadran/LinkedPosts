
interface CommentProps {
	topComment: {
		commentCreator: {
			name: string;
			photo: string;
		};
		content: string;
		reatedAt: string;
		
	};
}

export default function Comment({ topComment: { commentCreator: { name, photo }, content, reatedAt } }: CommentProps) {
  return (
    <>
      
		<div className="mt-4">
			
			<div className="flex items-center space-x-2">
				<img src={photo} alt={`${name}'s avatar`} className="w-6 h-6 rounded-full" />
				<div>
					<p className="text-gray-800 font-semibold">{name}</p>
					<p className="text-gray-500 text-sm">{content}</p>
					<p className="text-gray-400 text-xs">{reatedAt}</p>
				</div>
			</div>
		

		</div>
    </>
  )
}

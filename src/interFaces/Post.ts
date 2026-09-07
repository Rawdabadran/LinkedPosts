

export interface PosttopProps {
	image: string;
	body: string;
	commentsCount: number;
	createdAt: string;
	likes: unknown[];
	likesCount: number;
	user: {
		name: string;
		photo: string;
	};
}
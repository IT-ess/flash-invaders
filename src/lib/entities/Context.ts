export type ContextType = {
	id: number;
	name: string;
	// items: ContextItem[];
	carousel: CarouselItem[];
};

// type ContextItem = {
// 	type: 'text' | 'image' | 'video';
// 	content: string;
// };

export type CarouselItem = {
	caption: string;
	imgurl: string;
};

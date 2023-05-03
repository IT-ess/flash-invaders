export type ContextType = {
	id: number;
	name: string;
	items: ContextItem[];
	carousel: CarouselItem[];
};

export type ContextItem = {
	type: 'text' | 'audio' | 'video';
	source: string;
	caption?: string;
};

export type CarouselItem = {
	name: string;
	imgurl: string;
};
